import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage  {
    readonly productList: Locator;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly divInventory: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page)
        this.productList = page.locator('[data-test="inventory-list"]');
        this.addToCartButton = page.locator('button:has-text("Add to Cart")');
        this.productTitle = page.locator('[data-test="inventory-item-name"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.divInventory = page.locator('#inventory_container');
        this.cartBadge = page.locator(".shopping_cart_badge");
    }

     productLocatorByName(productName: string): Locator {
        return this.page.locator(`.inventory_item:has-text("${productName}")`);
    }

    async getProductPrice(productName: string): Promise<number> {
        let productPrice : number;
        let productPriceText = await (this.productLocatorByName(productName).locator('.inventory_item_price')).textContent();
        productPrice = Number(productPriceText?.replace('$', '') || '0');
        return productPrice;
    }

    async getProductDescription(productName: string): Promise<string> {
        let productDescription = await (this.productLocatorByName(productName).locator('.inventory_item_desc')).textContent();
        return productDescription || "";
    }

   async getAllPrices():Promise<string[]> {
        const prices = await this.productPrice.allTextContents();
        return prices;
    }

   async clickOnProductTitle(productTitle:string): Promise<void> {

       await this.click((this.productLocatorByName(productTitle).locator('.inventory_item_name')));
   }

   getAddToCartButtonByProductName(productName: string): Locator {
       return this.productLocatorByName(productName).locator('button:has-text("Add to Cart")');
   }    
}