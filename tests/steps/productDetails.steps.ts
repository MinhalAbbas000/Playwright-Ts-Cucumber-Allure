import { Given, When, Then } from "@cucumber/cucumber";
import { Assert } from '../../utils/assert';
import { ProductData } from '../../src/testData/product-data';
import { CustomWorld } from '../../src/support/world';
import { ConfigManager } from '../../src/config/configManager';
import { expect } from "playwright/test";


When('I click on {string} title', async function(this:CustomWorld,productName: string) {
    this.testContext.currentProductName = productName;
    await this.pages.productsPage.clickOnProductTitle(productName)
});

Then('product details page should be opened',async function(this:CustomWorld){
    await Assert.that(async()=>
    {
        await expect(this.pages.productDetailsPage.btnBackToProducts).toBeVisible();
    });
});

Then('I should see product name', async function(this:CustomWorld){
    await Assert.that(async ()=>{
        await expect(this.pages.productDetailsPage.productName).toHaveText(this.testContext.currentProductName!);
    })
})

Then('I should see product description',async function(this:CustomWorld){
    let productDescription = ProductData.find(p => p.title===this.testContext.currentProductName)?.description;
    await Assert.that(async()=>{
        await expect(await (this.pages.productDetailsPage.productDescription).textContent()).toBe(productDescription);
    },"Description fails to match");
})

Then('I should see product price',async function(this:CustomWorld){
    let productPrice  = ProductData.find(p => p.title===this.testContext.currentProductName)?.price;

    await Assert.that(async()=>{
        await expect(await this.pages.productDetailsPage.getProductPrice(this.testContext.currentProductName!)).toBe(productPrice);
    })
})

Then('I should see correct currency symbol',async function(this:CustomWorld){
    const currencySymbol = ConfigManager.get("currency") === "USD" ? "$" : 
                           ConfigManager.get("currency") === "EUR" ? "€" :
                           ConfigManager.get("currency") === "GBP" ? "£" : "";

    await Assert.that(async()=>{
        expect((await this.pages.productDetailsPage.productPrice.textContent())?.startsWith(currencySymbol)).toBeTruthy();
    })

})
