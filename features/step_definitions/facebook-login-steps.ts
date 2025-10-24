import { Given, When, Then} from '@cucumber/cucumber';
import { Page, Browser, chromium } from 'playwright';
import { expect } from 'playwright/test';

export let page: Page;
export let browser: Browser;
Given('I navgigate to the facebook page',async function(){
    browser = await chromium.launch({
        headless: false,
    });
    page = await browser.newPage();
    await page.goto('https://www.facebook.com/');
});

When('I validate the page title',async function(){
   const title = await page.title();
   expect(title).toContain('Facebook/');
});

// Then('I enter the username as {string}', async function(username){
//     await page.locator('input[id="email"]').fill(username);
// });


// Then('I enter the password as {string}', async function(password){
//     await page.locator('input[id="pass"]').fill(password);
// });


Then('I click the login button',async function(){
    await page.locator('button[name="login"]').click();
    await page.close();
    await browser.close();
});