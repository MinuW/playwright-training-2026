import { expect, test } from '@playwright/test';
import { EmployeeDataHelper } from '../helpers/personal-info-manager';

test('generates employee details in OrangeHRM-friendly formats', async () => {
  const employee = new EmployeeDataHelper().getEmployeeDetails();

  expect(employee.firstName).toBeTruthy();
  expect(employee.lastName).toBeTruthy();
  expect(employee.employeeId).toMatch(/^\d{6}$/);
  expect(employee.dateOfBirth).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(employee.mobileNumber).toMatch(/^\d{10}$/);
  expect(employee.personalEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  expect(['Male', 'Female']).toContain(employee.gender);
  expect(['Single', 'Married', 'Other']).toContain(employee.maritalStatus);
  expect([
    'American',
    'Australian',
    'British',
    'Canadian',
    'Indian',
    'Irish',
    'New Zealander',
    'South African',
  ]).toContain(employee.nationality);
});