import { faker } from '@faker-js/faker';

const MIN_EMPLOYEE_AGE = 18;
const MAX_EMPLOYEE_AGE = 65;
const EMPLOYEE_ID_LENGTH = 6;
const MOBILE_NUMBER_LENGTH = 10;

const GENDERS = ['Male', 'Female'] as const;
const MARITAL_STATUSES = ['Single', 'Married', 'Other'] as const;
const NATIONALITIES = [
	'American',
	'Australian',
	'British',
	'Canadian',
	'Indian',
	'Irish',
	'New Zealander',
	'South African',
] as const;

export type EmployeeGender = (typeof GENDERS)[number];
export type EmployeeMaritalStatus = (typeof MARITAL_STATUSES)[number];
export type EmployeeNationality = (typeof NATIONALITIES)[number];

export interface EmployeeData {
	firstName: string;
	middleName: string;
	lastName: string;
	employeeId: string;
	dateOfBirth: string;
	gender: EmployeeGender;
	mobileNumber: string;
	personalEmail: string;
	maritalStatus: EmployeeMaritalStatus;
	nationality: EmployeeNationality;
}

/**
 * Generates realistic, OrangeHRM-compatible employee form data with Faker.
 * Example: `const employee = new EmployeeDataHelper().getEmployeeDetails();`
 */
export class EmployeeDataHelper {
	/**
	 * Generates a plausible first name.
	* @returns {string} A non-empty Faker person first name.
	 */
	public getFirstName(): string {
		return faker.person.firstName();
	}

	/**
	 * Generates a plausible middle name; the Add Employee form allows this field to be blank.
	* @returns {string} A middle name or an empty string, selected randomly.
	 */
	public getMiddleName(): string {
		return faker.helpers.maybe(() => faker.person.middleName()) ?? '';
	}

	/**
	 * Generates a plausible last name.
	* @returns {string} A non-empty Faker person last name.
	 */
	public getLastName(): string {
		return faker.person.lastName();
	}

	/**
	 * Generates a six-digit employee identifier.
	* @returns {string} A six-character numeric string suitable for the Employee Id field.
	 */
	public getEmployeeId(): string {
		return faker.string.numeric(EMPLOYEE_ID_LENGTH);
	}

	/**
	 * Generates a date of birth for an adult aged 18 through 65.
	* @returns {string} The birth date formatted as `YYYY-MM-DD`.
	 */
	public getDateOfBirth(): string {
		const birthDate = faker.date.birthdate({
			min: MIN_EMPLOYEE_AGE,
			max: MAX_EMPLOYEE_AGE,
			mode: 'age',
		});
		const year = birthDate.getFullYear();
		const month = String(birthDate.getMonth() + 1).padStart(2, '0');
		const day = String(birthDate.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	/**
	 * Selects a gender value supported by OrangeHRM's Add Employee form.
	* @returns {EmployeeGender} Either `Male` or `Female`.
	 */
	public getGender(): EmployeeGender {
		return faker.helpers.arrayElement(GENDERS);
	}

	/**
	 * Generates a ten-digit mobile number without punctuation or a country code.
	* @returns {string} A ten-character numeric string.
	 */
	public getMobileNumber(): string {
		return faker.string.numeric(MOBILE_NUMBER_LENGTH);
	}

	/**
	 * Generates a realistic personal email address.
	* @returns {string} A syntactically valid email address from Faker.
	 */
	public getPersonalEmail(): string {
		return faker.internet.email();
	}

	/**
	 * Selects a marital status supported by OrangeHRM's Add Employee form.
	* @returns {EmployeeMaritalStatus} `Single`, `Married`, or `Other`.
	 */
	public getMaritalStatus(): EmployeeMaritalStatus {
		return faker.helpers.arrayElement(MARITAL_STATUSES);
	}

	/**
	 * Selects a common nationality available in the OrangeHRM nationality list.
	* @returns {EmployeeNationality} One of the supported nationality labels in this helper.
	 */
	public getNationality(): EmployeeNationality {
		return faker.helpers.arrayElement(NATIONALITIES);
	}

	/**
	 * Generates a complete employee profile for Add Employee, Edit Employee, or PIM search tests.
	* @returns {EmployeeData} All supported employee fields, with date, ID, phone, and dropdown constraints applied.
	 */
	public getEmployeeDetails(): EmployeeData {
		return {
			firstName: this.getFirstName(),
			middleName: this.getMiddleName(),
			lastName: this.getLastName(),
			employeeId: this.getEmployeeId(),
			dateOfBirth: this.getDateOfBirth(),
			gender: this.getGender(),
			mobileNumber: this.getMobileNumber(),
			personalEmail: this.getPersonalEmail(),
			maritalStatus: this.getMaritalStatus(),
			nationality: this.getNationality(),
		};
	}
}
