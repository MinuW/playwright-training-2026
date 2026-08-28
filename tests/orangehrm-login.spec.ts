import{test, expect} from '@playwright/test';


test('login-test for valid credentials', async ({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name:' Login'}).click();

    await expect(page).toHaveTitle(/OrangeHRM/);
    //await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-valid-credentials.png'});

});

test('login-test for blank username', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name:' Login'}).click();

    await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
    //await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-blank-username.png'});
});

test('login-test for blank password', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button',{name:' Login'}).click();
    
    await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
    await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-blank-password.png'});
});

test('login-test for invalid username', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin1@');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button',{name:' Login'}).click();

    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-invalid-username.png'});
});

test('login-test for invalid password', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123r');
    await page.getByRole('button',{name:' Login'}).click();

    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-invalid-password.png'});
});

test('login-test for valid username-leading/trailing spaces', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(' Admin ');
    await page.getByPlaceholder('Password').fill('admin123r');
    await page.getByRole('button',{name:' Login'}).click();

    await expect(page.locator('.oxd-alert-content--error')).toContainText('Invalid credentials');
    await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-valid-username-leading-trailing-spaces.png'});
});

test('login-test for valid password-leading/trailing spaces', async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill(' admin123r ');
    await page.getByRole('button',{name:' Login'}).click();

    await expect(page.locator('.oxd-alert-content--error')).toContainText('Invalid credentials');
    await page.screenshot({path:'tests/screens-orangehrm-login/screenshot-valid-password-leading-trailing-spaces.png'});
});