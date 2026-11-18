import { randomUUID } from 'node:crypto';
import { business } from '@/content/business';
import type { BookingPayload } from './booking';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export type DeliveryResult = {
  delivered: boolean;
  reason?: 'not-configured' | 'provider-error' | 'partial';
  failed?: 'office' | 'customer';
};

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.OFFICE_EMAIL && process.env.CONFIRMATION_FROM_EMAIL);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * F4: one email to the office, one auto-confirmation to the customer.
 * Retries transient failures, times out, and uses an idempotency key so a
 * retry cannot double-send. Only metadata (never PII) is logged by the caller.
 */
export async function sendBookingEmails(payload: BookingPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const office = process.env.OFFICE_EMAIL;
  const from = process.env.CONFIRMATION_FROM_EMAIL;
  if (!apiKey || !office || !from) return { delivered: false, reason: 'not-configured' };

  const officeText = [
    `New ${payload.requestType} request${payload.emergency ? ' (EMERGENCY flagged)' : ''}`,
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `ZIP: ${payload.zip}`,
    `Equipment: ${payload.equipmentType}`,
    `Preferred: ${payload.preferredDay}, ${payload.timeWindow}`,
    payload.streetAddress ? `Street address: ${payload.streetAddress}` : '',
    payload.customerStatus ? `Customer: ${payload.customerStatus}` : '',
    payload.planMember ? `Plan member: ${payload.planMember}` : '',
    payload.message ? `Message: ${payload.message}` : '',
  ].filter(Boolean).join('\n');

  const customerText = [
    `Hi ${payload.fullName.split(' ')[0]},`,
    '',
    `Thanks for contacting ${business.name}. We have received your ${payload.requestType.toLowerCase()} request and will contact you about it.`,
    '',
    `Our office is open ${business.hours.office}. ${business.hours.emergency}. ${business.hours.afterHours}`,
    '',
    `${business.name} · ${business.address.full} · ${business.phoneDisplay}`,
  ].join('\n');

  const idempotencyKey = randomUUID();
  const send = async (to: string, subject: string, text: string, replyTo?: string): Promise<boolean> => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(RESEND_ENDPOINT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': `${idempotencyKey}:${to}`,
          },
          body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
          signal: AbortSignal.timeout(8000),
        });
        if (response.ok) return true;
        // 4xx (bad key, unverified domain, invalid address) will never succeed on retry.
        if (response.status < 500 && response.status !== 429) return false;
      } catch { /* network / timeout — retry */ }
      if (attempt < 2) await sleep(200 * 2 ** attempt);
    }
    return false;
  };

  const [officeOk, customerOk] = await Promise.all([
    send(office, `New service request: ${payload.requestType}`, officeText, payload.email),
    send(payload.email, `We received your request — ${business.name}`, customerText),
  ]);
  if (officeOk && customerOk) return { delivered: true };
  if (!officeOk && !customerOk) return { delivered: false, reason: 'provider-error' };
  return { delivered: false, reason: 'partial', failed: officeOk ? 'customer' : 'office' };
}
