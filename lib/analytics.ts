/** Consent gate shared by the analytics loader, conversion events and RUM. */
export const CONSENT_KEY = 'wmp-analytics-consent';

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

type AnalyticsEvent = Record<string, unknown> & { event: string };

/** Events fired before a choice is made stay in memory — nothing leaves the device. */
const pendingEvents: AnalyticsEvent[] = [];

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try { return window.localStorage.getItem(CONSENT_KEY) === 'granted'; } catch { return false; }
}

function push(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * PRD 16.6 / F23: fire a conversion or RUM event only after consent.
 * Before consent the event is queued (never sent) and flushed on grant, so a
 * booking made while the banner is still open is not silently lost.
 */
export function fireConversionEvent(event: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const entry: AnalyticsEvent = { event, ...payload };
  if (hasAnalyticsConsent()) push(entry);
  else pendingEvents.push(entry);
}

export function flushConversionQueue(): void {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  while (pendingEvents.length) push(pendingEvents.shift()!);
}

export function setAnalyticsConsent(value: 'granted' | 'denied'): void {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* storage blocked */ }
  if (value === 'granted') flushConversionQueue();
}

export function clearConversionQueue(): void {
  pendingEvents.length = 0;
}
