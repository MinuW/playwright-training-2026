import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import MailosaurClient from "mailosaur";

const apiKey = process.env.MAILOSAUR_API_KEY;
const serverId = process.env.MAILOSAUR_SERVER_ID;
const mailosaur = new MailosaurClient(apiKey);

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("mailosaur tests", () => {
  test("should send an email", async () => {
    // Search for the message
    const message = await mailosaur.messages.get(serverId, {
      sentTo: "damian.o'keefe@b4ujcgqb.mailosaur.net",
    });
    // Make a simple API call to find the name of your inbox
    const result = await mailosaur.servers.list();
    console.log(`First Inbox name is ${result.items?.[0]?.name}`);
    console.log(`Second Inbox name is ${result.items?.[1]?.name}`);

    // Perform test assertions
    expect(message.from?.[0]?.name).toEqual("Minushi Navindya Wickramasinghe");
    expect(message.from?.[0]?.email).toEqual("navindya518@gmail.com");

    const emailAddress = mailosaur.servers.generateEmailAddress(serverId);
    console.log(emailAddress); 
  });

  test("signup flow", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.getByRole("heading")).toContainText(  "Signup for ACME product");

    const { firstName, lastName, expectedEmail } = newFunction();

    await page.locator('xpath=//input[@id="firstName"]').fill(firstName);
    await page.locator('xpath=//input[@id="lastName"]').fill(lastName);
    await page.locator('xpath=//input[@id="email"]').fill(expectedEmail);
    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(
      page.getByText("Thanks! An email has now been sent."),
    ).toBeVisible();

    const message = await mailosaur.messages.get(serverId,{sentTo: expectedEmail,});
    expect(message.subject).toContain('Welcome to ACME Product',);

  });

  test("password reset flow", async ({ page }) => {
    await page.goto("/password-reset");
    await expect(page.getByRole("heading")).toContainText(
      "Reset your password for ACME product",
    );

    const { expectedEmail } = newFunction();
    await page.locator('xpath=//input[@id="email"]').fill(expectedEmail);
    await page.getByRole("button", { name: "Reset my password" }).click();

    await expect(
      page.getByText("Thanks! An email has now been sent."),
    ).toBeVisible();

    const message = await mailosaur.messages.get(serverId,{sentTo: expectedEmail,});
    expect(message.subject).toContain('Set your new password for ACME Product',);

  });

  test("otp flow", async ({ page }) => {
    await page.goto("/otp");
    await expect(page.getByRole("heading")).toContainText(
      "Generate an access code for ACME product",
    );

    const { expectedEmail } = newFunction();
    await page.locator('xpath=//input[@id="email"]').fill(expectedEmail);
    await page.getByRole("button", { name: "Request access code" }).click();

     await expect(
      page.getByText("Thanks! An email has now been sent."),
    ).toBeVisible();

    const message = await mailosaur.messages.get(serverId,{sentTo: expectedEmail,});
    expect(message.subject).toContain('Here is your access code for ACME Product');
  });

  function newFunction() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);

    const emailName = `${firstName}.${lastName}`.toLowerCase();
    const emailDomain = "b4ujcgqb.mailosaur.net";
    const expectedEmail = `${emailName}@${emailDomain}`;
    console.log(`Generated Email: ${expectedEmail}`);
    return { firstName, lastName, expectedEmail };
  }
});
