import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/booking/route';
import { emailConfigured, sendBookingEmails } from '../lib/email';
import { checkRateLimit, rateLimitOk, resetRateLimit } from '../lib/rate-limit';

const valid = {
  fullName: 'Test Homeowner', phone: '330-555-0123', email: 'test@example.com', zip: '44420',
  requestType: 'Repair', timeWindow: 'Any', website: '',
};
const makeRequest = (body: unknown, ip: string, raw?: string) =>
  new NextRequest('http://localhost/api/booking/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: raw ?? JSON.stringify(body),
  });

function withEnv<T>(patch: Record<string, string | undefined>, fn: () => Promise<T> | T): Promise<T> | T {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(patch)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  const restore = () => { for (const [key, value] of previous) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } };
  try {
    const result = fn();
    return result instanceof Promise ? (result.finally(restore) as Promise<T>) : (restore(), result);
  } catch (error) { restore(); throw error; }
}

test('email delivery config is detected at call time', async () => {
  await withEnv({ RESEND_API_KEY: undefined, OFFICE_EMAIL: undefined, CONFIRMATION_FROM_EMAIL: undefined }, async () => {
    assert.equal(emailConfigured(), false);
    assert.deepEqual(await sendBookingEmails({ ...valid, equipmentType: 'Other' } as never), { delivered: false, reason: 'not-configured' });
  });
  await withEnv({ RESEND_API_KEY: 're_test', OFFICE_EMAIL: 'office@example.com', CONFIRMATION_FROM_EMAIL: 'no-reply@example.com' }, () => {
    assert.equal(emailConfigured(), true);
  });
});

test('PRODUCTION fails closed with 503 when email is not configured', async () => {
  await withEnv({
    NODE_ENV: 'production', ALLOW_TEST_BOOKINGS: undefined, RESEND_API_KEY: undefined,
    OFFICE_EMAIL: undefined, CONFIRMATION_FROM_EMAIL: undefined, BOOKING_RATE_LIMIT: '100',
  }, async () => {
    const response = await POST(makeRequest(valid, '203.0.113.10'));
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.equal(body.unavailable, true);
    assert.match(body.message, /call/i);
    assert.equal(response.headers.get('cache-control'), 'no-store, max-age=0, must-revalidate');
  });
});

test('staging/CI test mode returns an honest not-configured result', async () => {
  await withEnv({
    NODE_ENV: 'production', ALLOW_TEST_BOOKINGS: 'true', RESEND_API_KEY: undefined,
    OFFICE_EMAIL: undefined, CONFIRMATION_FROM_EMAIL: undefined, BOOKING_RATE_LIMIT: '100',
  }, async () => {
    const response = await POST(makeRequest(valid, '203.0.113.11'));
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.ok, true);
    assert.deepEqual(body.delivery, { delivered: false, reason: 'not-configured' });
  });
});

test('oversized and malformed bodies are rejected', async () => {
  await withEnv({ BOOKING_RATE_LIMIT: '100', ALLOW_TEST_BOOKINGS: 'true' }, async () => {
    const tooLarge = await POST(makeRequest({}, '203.0.113.12', JSON.stringify({ ...valid, message: 'x'.repeat(20_000) })));
    assert.equal(tooLarge.status, 413);
    const malformed = await POST(makeRequest({}, '203.0.113.13', '{not json'));
    assert.equal(malformed.status, 400);
  });
});

test('shared-store-aware rate limiter falls back locally and still blocks', async () => {
  resetRateLimit();
  await withEnv({ UPSTASH_REDIS_REST_URL: undefined, UPSTASH_REDIS_REST_TOKEN: undefined }, async () => {
    assert.equal(await checkRateLimit('198.51.100.1', 2, 60_000), true);
    assert.equal(await checkRateLimit('198.51.100.1', 2, 60_000), true);
    assert.equal(await checkRateLimit('198.51.100.1', 2, 60_000), false);
    assert.equal(rateLimitOk('198.51.100.2', 1), true);
    assert.equal(rateLimitOk('198.51.100.2', 1), false);
  });
});
