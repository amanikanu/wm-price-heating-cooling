import test from 'node:test';
import assert from 'node:assert/strict';

type Store = Map<string, string>;
function stubWindow(store: Store) {
  (globalThis as unknown as { window: unknown }).window = {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, value); },
    },
    dataLayer: [] as Record<string, unknown>[],
  };
}
const dataLayer = () => ((globalThis as unknown as { window: { dataLayer: Record<string, unknown>[] } }).window.dataLayer);

test('events fired before consent are queued, never sent, then flushed on grant', async () => {
  const { fireConversionEvent, flushConversionQueue, clearConversionQueue, setAnalyticsConsent, hasAnalyticsConsent, CONSENT_KEY } = await import('../lib/analytics');
  const store: Store = new Map();
  stubWindow(store);
  clearConversionQueue();
  fireConversionEvent('booking_submit', { request_type: 'Estimate' });
  fireConversionEvent('call_click', { source: 'phone_link' });
  assert.equal(dataLayer().length, 0, 'nothing may leave the device before consent');
  setAnalyticsConsent('granted');
  assert.equal(hasAnalyticsConsent(), true);
  assert.equal(store.get(CONSENT_KEY), 'granted');
  assert.deepEqual(dataLayer().map((e) => e.event), ['booking_submit', 'call_click']);
  fireConversionEvent('web_vitals', { metric_name: 'INP' });
  assert.equal(dataLayer().length, 3);
  flushConversionQueue();
  assert.equal(dataLayer().length, 3, 'flush must not double-send');
});

test('declining consent keeps the queue in memory and sends nothing', async () => {
  const { fireConversionEvent, setAnalyticsConsent, clearConversionQueue } = await import('../lib/analytics');
  const store: Store = new Map();
  stubWindow(store);
  clearConversionQueue();
  setAnalyticsConsent('denied');
  fireConversionEvent('booking_submit', { request_type: 'Repair' });
  assert.equal(dataLayer().length, 0);
});
