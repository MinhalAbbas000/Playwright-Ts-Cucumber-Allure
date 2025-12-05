import { When , Then } from "@cucumber/cucumber";
import { Assert } from "../../utils/assert";
import { CustomWorld } from "../../src/support/world";
import { expect } from "playwright/test";
import { ProductData } from "../../src/testData/product-data";

When('I click on add to cart icon',async function(this:CustomWorld){
       await this.pages.cartPage.click(this.pages.cartPage.shoppingCartLink);

})

Then('I should see the cart page listing all added items',async function(this:CustomWorld){

       for(let i=0 ; i<this.productsInCart.length;i++)
       {
        await expect(this.pages.cartPage.getproductDetailsLocator(this.productsInCart[i].name)).toBeVisible();
       }
})


Then('I should see the cart page listing all added items with correct qantities',async function(this:CustomWorld){

       for(let i=0 ; i<this.productsInCart.length;i++)
       {
        await expect(this.pages.cartPage.getProductQuanityLocator(this.productsInCart[i].name)).toHaveText(this.productsInCart[i].quantity.toString());
       }
})


Then('I should see the cart page listing all added items with correct price',async function(this:CustomWorld){

       for(let i=0 ; i<this.productsInCart.length;i++)
       {
        const priceOfProduct = ProductData.find(p=>p.title===this.productsInCart[i].name)?.price;
        await expect(await (this.pages.cartPage.getProductPriceLocator(this.productsInCart[i].name).textContent())).toContain(priceOfProduct?.toString());
       }
})