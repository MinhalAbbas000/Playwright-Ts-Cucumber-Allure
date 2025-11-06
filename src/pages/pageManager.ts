import { Page } from '@playwright/test';
import {RegistrationPage} from '../pages/regiestration-page';

export class PageManager {
    private _page: Page;
    private _registrationPage?: RegistrationPage ;

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

}