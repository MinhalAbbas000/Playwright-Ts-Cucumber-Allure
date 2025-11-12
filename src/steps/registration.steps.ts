import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from 'playwright/test';
import { Assert } from '../../utils/assert';
import { ConfigManager } from '../config/configManager';

// Step Definitions for Registration Page
Given('I navigate to the registration page', async function () {
  await this.page.goto(`${ConfigManager.get("baseUrl")}/way2auto_jquery/index.php`);

  const currentUrl = this.page.url();
  await Assert.that(async () => {
    expect(currentUrl).toContain("/way2auto_jquery/");
  }, "Navigation to registration page failed")
}
);


When('I enter the name as {string}', async function (name: string) {
    const { username, password } = ConfigManager.get("credentials");
    await this.pages.registrationPage.set_name(username);
});


Then('I enter the phone number as {string}', async function (phoneNumber: string) {
  const { username, password } = ConfigManager.get("credentials");
    await this.pages.registrationPage.set_phone_no(password);
}); 


Then('I enter the email as {string}', async function (email:string) {
await this.pages.registrationPage.set_email(email);
});


Then('I select the country as {string}', async function (country:string) {
await this.pages.registrationPage.set_country(country);
});


Then('I enter the city as {string}', async function (city:string) {
await this.pages.registrationPage.set_city(city);
});



Then('I enter the username as {string}', async function (username:string) {
await this.pages.registrationPage.set_username(username);
});



Then('I enter the password as {string}', async function (password:string) {
await this.pages.registrationPage.set_password(password);
});



Then('I click the register button', async function () {
await this.pages.registrationPage.submit_form();
await this.page.waitForTimeout(3000);
});