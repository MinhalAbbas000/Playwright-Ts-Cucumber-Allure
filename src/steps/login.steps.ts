import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { Assert } from '../../utils/assert';
import { ConfigManager } from '../config/configManager';
import { CustomWorld } from '../support/world';
/**
 * @typedef { import('../support/world').CustomWorld } CustomWorld
 */


Given('I navigate to the application', async function () {

    await this.page.goto(ConfigManager.get("baseUrl"));

});

When('I enter username {string}', async function (username:string) {

    await this.pages.loginPage.enterUserName(username);
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

