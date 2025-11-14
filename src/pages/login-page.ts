import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    readonly txtUsername : Locator;
    readonly txtPassword : Locator;
    readonly btnLogin : Locator;
    readonly lblErrorMessage : Locator;
                
    constructor(page: Page) {
        super(page);
        this.txtUsername = page.locator('#user-name');
        this.txtPassword = page.locator('#password');
        this.btnLogin = page.locator('#login-button');
        this.lblErrorMessage = page.locator('.error-message-container');
    }

    async enterUserName(username: string) {
        await this.txtUsername.fill(username);
    }

    async enterPassword(password: string) {
        await this.txtPassword.fill(password);
    }

    async clickLogin() {
        await this.btnLogin.click();
    }
    
    async login(username: string, password: string) {
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
}   