import fs from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync';

type TestRecord = {
  testCaseId?: string;
  username?: string;
  password?: string;
  expectedError?: string;
};

const records = parse(fs.readFileSync(path.join(__dirname, 'test-data/login-negative-data.csv')), {
  columns: true,
  bom: true,        // strips a leading BOM if present
  trim: true,        // trims whitespace from BOTH header names and values
  relax_quotes: true,
  skip_empty_lines: true
}) as TestRecord[];

test.beforeEach(async({page})=>{
    await page.goto('/');
});

test.describe('SauceDemo login tests : negative cases', () => {
  for (const [index, record] of records.entries()) {
    test(`parameterizing negative login-tests: ${record.testCaseId || `row-${index + 1}`}`, async ({ page }) => {
      await page.getByPlaceholder('Username').clear();
      await page.getByPlaceholder('Username').fill(record.username || '');
      await page.getByPlaceholder('Password').clear();
      await page.getByPlaceholder('Password').fill(record.password || '');
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByRole('alert')).toContainText(record.expectedError || '');
      console.log(`Test Case ID: ${record.testCaseId}, Username: ${record.username}, Password: ${record.password}, Expected Error: ${record.expectedError}`);
    });
  }
});