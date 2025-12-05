import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { Assert } from '../../utils/assert';
import { ConfigManager } from '../../src/config/configManager';
import { CustomWorld } from '../../src/support/world';
import { loginData } from "../../src/testData/login-data";
import type { User } from "../../src/types";


Given('I use login data set {string}', function (userKey: keyof typeof loginData) {
   this.testContext.currentUser = loginData[userKey];
});

Given('I navigate to the application', async function () {

    await this.page.goto(ConfigManager.get("baseUrl"));

});

When('I enter username', async function () {

    await this.pages.loginPage.enterUserName( this.testContext.currentUser.username);
});

When('I enter username {string}', async function (username:string) {

    await this.pages.loginPage.enterUserName(username);
});


When('I enter password', async function () {
    await this.pages.loginPage.enterPassword( this.testContext.currentUser.password);
});

When('I enter password {string}', async function (password:string) {
    await this.pages.loginPage.enterPassword(password);
});

When('I click the login button', async function () {
    await this.pages.loginPage.clickLogin();
});

Then('I should see the inventory page', async function () {
     await Assert.that(async () => {
     await expect(this.pages.productsPage.divInventory).toBeVisible();
    }, "Inventory page is not visible");
});


Then('I should see an error message {string}', async function (errorMessage: string) {
     await Assert.that(async () => {
     await expect(await this.pages.loginPage.lblErrorMessage.textContent()).toContain(errorMessage);
    }, "Error message not found");
});

Given('I navigate to the application and login', async function () {

    let user = loginData.validUser;
    await this.page.goto(ConfigManager.get("baseUrl"));
    await this.pages.loginPage.enterUserName(user.username);
    await this.pages.loginPage.enterPassword(user.password);
    await this.pages.loginPage.clickLogin();
});

