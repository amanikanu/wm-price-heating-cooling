/**
 * Rate limiting with an optional shared store.
 *
 * Production on a multi-instance/serverless host: set UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN so every instance shares the counter. Without them
 * the limiter falls back to a per-process Map (fine for a single instance or a
 * local preview, ineffective across serverless instances — HANDOFF documents
 * this so it cannot be forgotten at launch).
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimitOk(key: string, limit = 5, windowMs = 10 * 60 * 1000, now = Date.now()): boolean {
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export function resetRateLimit() { hits.clear(); }

async function upstash(url: string, token: string, command: string[]): Promise<number | null> {
  const response = await fetch(`${url.replace(/\/$/, '')}/${command.map(encodeURIComponent).join('/')}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error(`upstash ${response.status}`);
  const data = (await response.json()) as { result?: number | string };
  const value = Number(data.result);
  return Number.isFinite(value) ? value : null;
}

/** Async, shared-store-aware check. Returns true when the request is allowed. */
export async function checkRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return rateLimitOk(key, limit, windowMs);

  const windowKey = `wmp:rl:${key}:${Math.floor(Date.now() / windowMs)}`;
  try {
    const count = await upstash(url, token, ['incr', windowKey]);
    if (count === null) throw new Error('bad upstash response');
    if (count === 1) await upstash(url, token, ['expire', windowKey, String(Math.ceil(windowMs / 1000))]);
    return count <= limit;
  } catch {
    // Never let a broken rate-limit store take the lead form down. Log metadata only.
    console.warn('booking.rate_limit_store_unavailable');
    return rateLimitOk(`fallback:${key}`, limit, windowMs);
  }
}
