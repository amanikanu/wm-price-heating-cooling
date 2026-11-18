import { test, expect } from '@playwright/test';

test('non-emergency booking succeeds in the short form and shows what happens next', async ({ page }) => {
  await page.goto('/request-service/');
  await expect(page.getByRole('heading', { name: 'Book Service', level: 1 })).toBeVisible();
  await page.getByLabel('No, it can wait').check();
  await page.getByLabel('Full name').fill('Test Homeowner');
  await page.getByLabel('Phone').fill('330-555-0123');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('ZIP code').fill('44420');
  await page.getByLabel('What do you need?').selectOption('Maintenance');
  await page.getByRole('button', { name: 'Send my request' }).click();
  await expect(page.getByRole('heading', { name: /we have your request/i })).toBeVisible();
  await expect(page.getByText(/we will contact you/i)).toBeVisible();
  await expect(page.getByText(/8 a.m.–5 p.m./).first()).toBeVisible();
});

test('emergency branch puts the call button and after-hours instructions first', async ({ page }) => {
  await page.goto('/request-service/');
  await page.getByLabel('Yes, it is').check();
  await expect(page.getByRole('heading', { name: /call us now/i })).toBeVisible();
  await expect(page.getByText(/press 1/i).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /330\.545\.3722/ }).first()).toHaveAttribute('href', 'tel:+13305453722');
});

test('no Saturday option while saturdayServiceEnabled is false', async ({ page }) => {
  await page.goto('/request-service/');
  const options = await page.getByLabel('Preferred day').locator('option').allTextContents();
  expect(options).not.toContain('Saturday');
  expect(options).toContain('Any');
});

test('estimate URL preselects the Estimate request type', async ({ page }) => {
  await page.goto('/request-service/?type=Estimate');
  await expect(page.getByLabel('What do you need?')).toHaveValue('Estimate');
});
