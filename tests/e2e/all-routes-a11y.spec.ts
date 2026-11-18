import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { allPublicRoutes } from '../../content/routes';

/** Full-site WCAG sweep (all 103 routes) plus console/network error detection. */
test('axe: zero serious/critical violations and zero failed requests on every public route', async ({ page }) => {
  test.setTimeout(600_000);
  const violations: string[] = [];
  const errors: string[] = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
  page.on('requestfailed', (req) => {
    const reason = req.failure()?.errorText ?? '';
    if (reason.includes('ERR_ABORTED') || req.url().includes('_rsc=')) return;
    errors.push(`request failed: ${req.url()}`);
  });
  page.on('response', (res) => { if (res.status() >= 400) errors.push(`HTTP ${res.status()}: ${res.url()}`); });

  for (const path of allPublicRoutes()) {
    const response = await page.goto(path);
    expect(response?.status(), `GET ${path}`).toBe(200);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    for (const violation of results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')) {
      violations.push(`${path} — ${violation.id}: ${violation.help}`);
    }
  }
  expect(violations.slice(0, 30)).toEqual([]);
  expect(errors.slice(0, 30)).toEqual([]);
});
