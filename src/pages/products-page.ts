import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';


export class ProductsPage extends BasePage  {
    readonly productList: Locator;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly divInventory: Locator;

    constructor(page: Page) {
        super(page)
        this.productList = page.locator('[data-testid="product-list"]');
        this.addToCartButton = page.locator('button:has-text("Add to Cart")');
        this.productTitle = page.locator('[data-testid="product-title"]');
        this.productPrice = page.locator('[data-testid="product-price"]');
        this.divInventory = page.locator('#inventory_container');
    }

    async navigate() {
        await this.page.goto('/products');
    }

}