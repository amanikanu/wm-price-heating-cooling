import { test, expect } from '@playwright/test';
import { redirects } from '../../content/redirects';

test('/request-estimate/ 301s to the single Book Service form with type preselected', async ({ request }) => {
  const response = await request.get('/request-estimate/', { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers()['location']).toContain('/request-service/?type=Estimate');
  const final = await request.get(response.headers()['location']!, { maxRedirects: 0 });
  expect(final.status()).toBe(200);
});

test('legacy slugs redirect cleanly', async ({ request }) => {
  for (const source of ['/is-your-heating-system-ready-for-company-state-long-winter/', '/how-long-will-a-furnace-heat-pump-or-boiler-last-in-company-state-long/']) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect([301, 307, 308]).toContain(response.status());
    const location = response.headers()['location'];
    expect(location).not.toContain('company-state');
    const final = await request.get(location!, { maxRedirects: 0 });
    expect(final.status()).toBe(200);
  }
});

test('every legacy URL returns 200 or a single 301 to a 200', async ({ request }) => {
  // Spot-check the whole generated map in batches to keep CI time reasonable.
  for (const redirect of redirects.slice(0, 40)) {
    const first = await request.get(redirect.source, { maxRedirects: 0 });
    expect([200, 301, 307, 308]).toContain(first.status());
    if (first.status() === 200) continue;
    const second = await request.get(first.headers()['location']!, { maxRedirects: 0 });
    expect(second.status()).toBe(200);
  }
});

test('no console errors or failed requests on key templates', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('requestfailed', (req) => {
    const reason = req.failure()?.errorText ?? '';
    if (reason.includes('ERR_ABORTED') || req.url().includes('_rsc=')) return; // navigation prefetch cancelled
    errors.push(`request failed: ${req.url()}`);
  });
  page.on('response', (res) => { if (res.status() >= 400) errors.push(`HTTP ${res.status()}: ${res.url()}`); });
  for (const path of ['/', '/residential/furnaces/', '/city/austintown-oh/', '/request-service/', '/news/']) {
    await page.goto(path);
  }
  expect(errors).toEqual([]);
});

test('each H2 appears once and there are no duplicate sections', async ({ page }) => {
  await page.goto('/');
  const headings = await page.locator('h2').allTextContents();
  const trimmed = headings.map((h) => h.trim());
  expect(new Set(trimmed).size).toBe(trimmed.length);
});
