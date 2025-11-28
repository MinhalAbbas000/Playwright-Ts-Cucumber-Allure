import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { ProductDetailsPage } from './productDetails-page';

export class PageManager {
    private _page: Page;
    private _loginPage?: LoginPage;
    private _productsPage?: ProductsPage;
    private _productDetailsPage?: ProductDetailsPage;

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

}