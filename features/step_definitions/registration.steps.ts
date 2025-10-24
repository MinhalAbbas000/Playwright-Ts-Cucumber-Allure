import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/world';
import { expect } from 'playwright/test';



Given('I navigate to the registration page', async function (this: CustomWorld) {
    await this.page.goto("https://www.way2automation.com/way2auto_jquery/index.php");
    expect(this.page.url()).toContain('/way2auto_jquery/');
});



When('I enter the name as {string}', async function (this:CustomWorld,name: string) {
    await this.pages.registrationPage.set_name(name);
});



Then('I enter the phone number as {string}', async function (this:CustomWorld,phoneNumber: string) {
    await this.pages.registrationPage.set_phone_no(phoneNumber);
});



Then('I enter the email as {string}', async function (this:CustomWorld,email:string) {
await this.pages.registrationPage.set_email(email);
});


Then('I select the country as {string}', async function (this:CustomWorld,country:string) {
await this.pages.registrationPage.set_country(country);
});


Then('I enter the city as {string}', async function (this:CustomWorld,city:string) {
await this.pages.registrationPage.set_city(city);
});



Then('I enter the username as {string}', async function (this:CustomWorld,username:string) {
await this.pages.registrationPage.set_username(username);
});



Then('I enter the password as {string}', async function (this:CustomWorld,password:string) {
await this.pages.registrationPage.set_password(password);
});



Then('I click the register button', async function (this:CustomWorld) {
await this.pages.registrationPage.submit_form();
await this.page.waitForTimeout(3000);
});