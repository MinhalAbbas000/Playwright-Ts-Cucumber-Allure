import {Page,Locator} from '@playwright/test'
import { BasePage } from '../pages/base-page';


export class CartPage extends BasePage {
    readonly shoppingCartLink : Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');

    }

   getproductDetailsLocator(productName:string):Locator{
        return this.page.locator(`.cart_item:has-text("${productName}")`);

    }

    getProductQuanityLocator(productName:string): Locator{
        return this.getproductDetailsLocator(productName).locator('.cart_quantity');
    }

    getProductDescriptionLocator(productName:string): Locator{
        return this.getproductDetailsLocator(productName).locator('.inventory_item_desc');
    }

    getProductPriceLocator(productName:string): Locator {
        return this.getproductDetailsLocator(productName).locator('.inventory_item_price');
    }

}
