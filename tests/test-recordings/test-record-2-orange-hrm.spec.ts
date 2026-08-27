import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#app')).toMatchAriaSnapshot(`
    - text: 
    - paragraph: Time at Work
    - separator
    - img "profile picture"
    - paragraph: Punched Out
    - paragraph: "/Punched Out: Today at \\\\d+:\\\\d+ PM \\\\(GMT 5\\\\.5\\\\)/"
    - text: /\\d+[hmsp]+ [\\d,.]+[bkmBKM]+ Today/
    - button ""
    - separator
    - paragraph: This Week
    - paragraph: /Aug \\d+ - Aug \\d+/
    - text: 
    - paragraph: /\\d+[hmsp]+ [\\d,.]+[bkmBKM]+/
    `);
  await expect(page.getByRole('banner')).toContainText('Dashboard');
  await page.locator('span').filter({ hasText: 'Demo Source' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});