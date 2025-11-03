import { Page } from 'playwright';
import { RegistrationPage } from '../pages/regiestration-page';

export class PageFixture {


    readonly registrationPage: RegistrationPage;
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;

        this.registrationPage = new RegistrationPage(page);

    }

}