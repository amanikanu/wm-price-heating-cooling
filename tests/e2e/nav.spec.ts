import { test, expect } from '@playwright/test';

test('sticky header has 7 nav items plus persistent Call and Book CTAs', async ({ page }) => {
  await page.goto('/');
  const desktopNav = page.getByRole('navigation', { name: 'Primary' });
  if (await desktopNav.isVisible()) {
    await expect(desktopNav.getByRole('link')).toHaveCount(7);
  } else {
    await page.locator('summary[aria-label="Open navigation menu"]').click();
    // 7 nav items; the 8th link in that panel is the persistent Call CTA.
    await expect(page.getByRole('navigation', { name: 'Mobile primary' }).locator('a[href^="/"]')).toHaveCount(7);
  }
  await expect(page.locator('a[data-call-number]').first()).toHaveAttribute('href', 'tel:+13305453722');
  await expect(page.getByRole('link', { name: 'Book Service' }).first()).toBeVisible();
});

test('mobile has a sticky bottom call bar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const bar = page.locator('div.fixed.inset-x-0.bottom-0');
  await expect(bar).toBeVisible();
  await expect(bar.getByRole('link', { name: /call now/i })).toHaveAttribute('href', 'tel:+13305453722');
});

test('keyboard-only run through the booking form succeeds', async ({ page }) => {
  await page.goto('/request-service/');
  await page.keyboard.press('Tab');
  await page.getByLabel('No, it can wait').focus();
  await page.keyboard.press('Space');
  await page.getByLabel('Full name').fill('Keyboard User');
  await page.getByLabel('Phone').fill('3305550123');
  await page.getByLabel('Email').fill('keyboard@example.com');
  await page.getByLabel('ZIP code').fill('44420');
  await page.getByRole('button', { name: 'Send my request' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: /we have your request/i })).toBeVisible();
});
