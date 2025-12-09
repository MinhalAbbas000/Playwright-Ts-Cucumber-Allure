import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { logger } from '../../utils/logger';

export class ProductDetailsPage extends BasePage {

    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly btnAddToCart: Locator;
    readonly productContainer: Locator;
    readonly btnBackToProducts: Locator;

    constructor(page: Page){
        super(page);
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription =page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.btnAddToCart = page.locator('#add-to-cart');
        this.productContainer = page.locator('[data-test="inventory-item"]');
        this.btnBackToProducts = page.locator('#back-to-products');
    }

        async getProductPrice(productName: string): Promise<number> {
        let productPrice : number;
        let productPriceText = await this.productPrice.textContent();
        productPrice = Number(productPriceText?.replace('$', '') || '0');
        logger.info(`The price fetched is ${productPrice}`);
        return productPrice;
    }

}

