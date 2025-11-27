import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { Assert } from '../../utils/assert';
import { ProductData } from '../../src/testData/product-data';
import { CustomWorld } from '../../src/support/world';
import { ConfigManager } from '../../src/config/configManager';

When('I navigate to the product list page', async function () {
    await this.pages.productsPage.naigateToRoute("inventory");
});

Then('I should see the product {string} on the list', async function (productName:string) {
    await Assert.that(async () => {   
     await expect(this.pages.productsPage.productLocatorByName(productName)).toBeVisible();
    }, `Product ${productName} is not visible on the product list`);
});

Then('I should see the {string} for the product {string} is correct', async function (this:CustomWorld, price: string, productName: string) {
   await Assert.that(async()=>{
        await expect(await this.pages.productsPage.getProductPrice(productName)).toBe(Number(price));
    });
});

Then('I should see the description for the product {string} is correct', async function(productName: string) {

    const actualProductDescription = await this.pages.productsPage.getProductDescription(productName);
    const expectedProduct = ProductData.find(p => p.title === productName);
    const expectedProductDescription = expectedProduct ? expectedProduct.description : "";
    await Assert.that(async()=>{
        expect(actualProductDescription).toBe(expectedProductDescription);
    });
});

Then('I should see all product prices in currency defined in the config', function (this:CustomWorld) {
    const currencySymbol = ConfigManager.get("currency") === "USD" ? "$" : 
                           ConfigManager.get("currency") === "EUR" ? "€" :
                           ConfigManager.get("currency") === "GBP" ? "£" : "";

    return Assert.that(async()=>{
        const prices = await this.pages.productsPage.getAllPrices();
        for (const price of prices) {
            expect(price.startsWith(currencySymbol)).toBeTruthy();
        }
    });
});


