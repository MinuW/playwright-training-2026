import{test, expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('/');
});

test.describe('OrangeHRM login tests : possitive cases',()=>{
    test('login-test for valid credentials', async ({page})=>{
        // test.slow(browserName === 'firefox', 'This test is slow on Firefox');
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button',{name:' Login'}).click(); 

        await expect(page).toHaveTitle(/OrangeHRM/);
        //await page.waitForLoadState('networkidle');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-valid-credentials.png'});
    });

    test('login-test for case-insensitive username', async({page})=>{
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await page.getByPlaceholder('Username').fill('admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button',{name:' Login'}).click(); 

        await expect(page).toHaveTitle(/OrangeHRM/);
        //await page.waitForLoadState('networkidle');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-case-insensitive-username.png'});
    });
});

test.describe('OrangeHRM login tests : negative cases',()=>{
    test('login-test for blank username', async({page})=>{
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await page.getByPlaceholder('Username').fill('');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button',{name:' Login'}).click();

        await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-blank-username.png'});
    });

    test('login-test for blank password', async({page})=>{
        await expect(page.getByPlaceholder('Username')).toBeVisible();
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('');
        await page.getByRole('button',{name:' Login'}).click();
        
        await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-blank-password.png'});
    });

    test('login-test for invalid username', async({page})=>{
        await page.getByPlaceholder('Username').fill('Admin1@');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button',{name:' Login'}).click();

        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-invalid-username.png'});
    });

    test('login-test for invalid password', async({page})=>{
        //test.slow(browserName === 'chromium', 'This test is slow on Chromium');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123r');
        await page.getByRole('button',{name:' Login'}).click();

        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-invalid-password.png'});
    });

    test('login-test for valid username-leading/trailing spaces', async({page})=>{
        //test.slow(browserName === 'chromium', 'This test is slow on Chromium');
        //test.slow(browserName === 'firefox', 'This test is slow on Firefox');
        await page.getByPlaceholder('Username').fill(' Admin ');
        await page.getByPlaceholder('Password').fill('admin123r');
        await page.getByRole('button',{name:' Login'}).click();

        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-valid-username-leading-trailing-spaces.png'});
    });

    test('login-test for valid password-leading/trailing spaces', async({page})=>{
        //test.slow(browserName === 'firefox', 'This test is slow on Firefox');
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'Password' }).fill(' admin123r ');
        await page.getByRole('button',{name:' Login'}).click();

        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-valid-password-leading-trailing-spaces.png'});
    });


    test('login-test for case-sensitive password', async({page})=>{
        //test.slow(browserName === 'chromium', 'This test is slow on Chromium');
        //test.slow(browserName === 'firefox', 'This test is slow on Firefox');
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
        await page.getByRole('button',{name:' Login'}).click();

        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-case-sensitive-password.png'});
    });

    test('login-test for masked password test', async({page})=>{
        //test.slow(browserName === 'firefox', 'This test is slow on Firefox');
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        
        await expect(page.getByPlaceholder('Password')).toHaveAttribute('type','password');

        await page.getByPlaceholder('Password').fill('Admin123');
        await expect(page.getByPlaceholder('Password')).toHaveAttribute('type','password');

        //await page.screenshot({path:'tests/orangeTests/screens-orangehrm-login/screenshot-masked-password.png'});
    });
});
