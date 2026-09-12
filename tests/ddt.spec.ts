import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { parse } from 'csv-parse/sync';

type TestRecord = {
  username?: string;
  password?: string;
  expectedError?: string;
};

const records = parse(fs.readFileSync(path.join(__dirname, 'input.csv')), {
  columns: true,
  ltrim: true,
  relax_quotes: true,
  skip_empty_lines: true
}) as TestRecord[];

for (const [index, record] of records.entries()) {
  test(`foo: ${record.username || `row-${index + 1}`}`, async ({ page: _page }) => {
    console.log(record.username, record.password, record.expectedError);
  });
}