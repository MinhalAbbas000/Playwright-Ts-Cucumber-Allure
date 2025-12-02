import { When , Then } from "@cucumber/cucumber";
import { Assert } from "../../utils/assert";
import { CustomWorld } from "../../src/support/world";
import { expect } from "playwright/test";

When('I add {string} {string} item to cart', async function(this:CustomWorld, quantity: number,product: string){

    for (let i=0; i < quantity; i++)
    {
        await this.pages.productsPage.click(this.pages.productsPage.getAddToCartButtonByProductName(product));
    }
});

Then('badge on the cart should display {string}', async function (this: CustomWorld, quantity: number) {

    await Assert.that(async () => {
        await expect(await this.pages.productsPage.cartBadge.textContent()).toBe(quantity)
    });
})

When('I add {string} {string} item to carts from product details page.', async function (this: CustomWorld, quantity: number, product: string) {
    for (let i = 0; i < quantity; i++) {
        await this.pages.productDetailsPage.click(this.pages.productDetailsPage.btnAddToCart);
    }
});