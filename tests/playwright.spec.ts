import{test, expect} from '@playwright/test';

test('testing documentation link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Testing documentation' }).click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

});