import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { ProductDetailsPage } from './productDetails-page';
import { CartPage } from './cart-pages';

export class PageManager {
    private _page: Page;
    private _loginPage?: LoginPage;
    private _productsPage?: ProductsPage;
    private _productDetailsPage?: ProductDetailsPage;
    private _cartPage?: CartPage

    constructor(page: Page) {
        this._page = page;
    }

    get loginPage()
    {
        if(!this._loginPage){
            this._loginPage = new LoginPage(this._page);
        }
        return this._loginPage                   
    }

    get productsPage()
    {
        if(!this._productsPage){
            this._productsPage = new ProductsPage(this._page);
        }
        return this._productsPage                   
    }
    
    get productDetailsPage()
    {
        if(!this._productDetailsPage)
        {
            this._productDetailsPage = new ProductDetailsPage(this._page);
        }
        return this._productDetailsPage;
    }

    get cartPage()
    {
        if(!this._cartPage)
        {
            this._cartPage = new CartPage(this._page);
        }
        return this._cartPage;
    }

}