import { NextResponse } from 'next/server';
import { emailConfigured } from '@/lib/email';

export const runtime = 'nodejs';

/** Deployment / uptime probe. Never exposes PII or secret values. */
export function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'wm-price-web',
      bookingEmailConfigured: emailConfigured(),
      time: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
