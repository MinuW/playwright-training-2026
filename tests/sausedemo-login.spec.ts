import{test,expect}from '@playwright/test';

test('login test-valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveTitle(/Swag Labs/);

//logout from the system
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    
});

test('login test-blank credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

});

test('login test-blank username with valid password', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.getByText('')).toBeVisible();
});

test('login test-blank password with valid username', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});

test('login test-valid username with invalid password', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('s3cret_sauc3');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login test-invalid username with valid password ',async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('invalid_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login test-locked out user',async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out')).toBeVisible();
});

//data driven testing
[
    {username:'Minushi', password:'test123', expected:'Epic sadface: Username and password do not match any user in this service'},
    {username:'standard_user', password:'test123', expected:'Epic sadface: Username and password do not match any user in this service'},
].forEach(({username, password, expected})=>{
    test(`parameterizing login-tests: ${username}`, async({page})=>{
        console.log(`username is ${username} password is ${password} expected result is ${expected}`);

        await page.goto('https://www.saucedemo.com/');
        await page.getByPlaceholder('Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button',{name:'Login'}).click();

        await expect(page.getByText(expected)).toBeVisible();
    });
});

