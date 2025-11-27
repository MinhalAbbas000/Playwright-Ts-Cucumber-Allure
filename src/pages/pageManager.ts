import { Page } from '@playwright/test';
import {RegistrationPage} from '../pages/regiestration-page';
import {LoginPage} from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';

export class PageManager {
    private _page: Page;
    private _registrationPage?: RegistrationPage ;
    private _loginPage?: LoginPage;
    private _productsPage?: ProductsPage;

    constructor(page: Page) {
        this._page = page;
    }

    get registrationPage()
    {
        if(!this._registrationPage){
            this._registrationPage = new RegistrationPage(this._page);
        }
        return this._registrationPage;
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

}