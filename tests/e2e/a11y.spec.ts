import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const templates = ['/', '/residential/furnaces/', '/city/austintown-oh/', '/request-service/', '/news/', '/assurance-and-security-plans/'];

for (const path of templates) {
  test(`axe: zero serious or critical violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}
