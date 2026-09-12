import fs from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync';

type TestRecord = {
  username?: string;
  password?: string;
  expectedError?: string;
};

const records = parse(fs.readFileSync(path.join(__dirname, 'test-data/login-negative-data.csv')), {
  columns: true,
  ltrim: true,
  relax_quotes: true,
  skip_empty_lines: true
}) as TestRecord[];

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/');
});
for (const [index, record] of records.entries()) {
  test(`foo: ${record.username || `row-${index + 1}`}`, async ({ page }) => {
    await page.getByPlaceholder('Username').fill(record.username || '');
    await page.getByPlaceholder('Password').fill(record.password || '');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByRole('alert')).toContainText(record.expectedError || '');
    console.log(record.username, record.password, record.expectedError);
  });
}