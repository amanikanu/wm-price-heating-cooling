import { NextResponse, type NextRequest } from 'next/server';
import { availableDays, bookingSchema } from '@/lib/booking';
import { checkRateLimit } from '@/lib/rate-limit';
import { emailConfigured, sendBookingEmails } from '@/lib/email';
import { business } from '@/content/business';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 10 * 60 * 1000;

/** Lead responses contain PII — never cache them. */
const json = (data: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  NextResponse.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate', ...extraHeaders },
  });

export async function POST(request: NextRequest) {
  let raw: string;
  try { raw = await request.text(); } catch { return json({ ok: false, message: 'Invalid request.' }, 400); }
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, message: 'Request too large.' }, 413);

  let body: unknown;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, message: 'Invalid request.' }, 400); }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, errors: parsed.error.flatten().fieldErrors }, 400);
  }
  const payload = parsed.data;

  if (!availableDays().includes(payload.preferredDay)) {
    return json({ ok: false, errors: { preferredDay: 'Choose an available day' } }, 400);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const configuredLimit = Number(process.env.BOOKING_RATE_LIMIT ?? 5);
  const limit = Number.isFinite(configuredLimit) && configuredLimit > 0 ? configuredLimit : 5;
  if (!(await checkRateLimit(ip, limit, WINDOW_MS))) {
    return json(
      { ok: false, message: 'Too many requests. Please call us instead.' },
      429,
      { 'Retry-After': String(Math.ceil(WINDOW_MS / 1000)) },
    );
  }

  // FAIL CLOSED: in production, never accept a lead we cannot deliver.
  // Staging/CI can opt in with ALLOW_TEST_BOOKINGS=true for the honest test-mode screen.
  const testModeAllowed =
    process.env.NODE_ENV !== 'production' || process.env.ALLOW_TEST_BOOKINGS === 'true';
  if (!emailConfigured() && !testModeAllowed) {
    console.error('booking.email_not_configured');
    return json(
      { ok: false, message: `Online requests are temporarily unavailable. Please call ${business.phoneDisplay}.`, unavailable: true },
      503,
    );
  }

  // Log metadata only — no PII in application logs (PRD 16.6).
  console.info('booking.received', {
    requestType: payload.requestType,
    timeWindow: payload.timeWindow,
    emergency: payload.emergency,
  });

  const delivery = await sendBookingEmails(payload);
  console.info('booking.delivery', { delivered: delivery.delivered, reason: delivery.reason ?? 'ok' });

  if (!delivery.delivered && delivery.reason !== 'not-configured') {
    return json(
      { ok: false, message: `We could not send your request. Please call ${business.phoneDisplay}.`, unavailable: true },
      502,
    );
  }

  return json({ ok: true, delivery });
}
