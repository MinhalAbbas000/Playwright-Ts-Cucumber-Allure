import {Locator, Page} from '@playwright/test';
import { Routes, RouteKey } from "../routes";
import { ConfigManager } from '../config/configManager';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async naigateToRoute(routeKey: RouteKey) {
        const baseUrl = ConfigManager.get("baseUrl");
        const route = Routes[routeKey];
        await this.page.goto(baseUrl + route);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async type(locator: string, value: string) {
        await this.page.locator(locator).fill(value);
    }

    async getText(locator: string) {
        return await this.page.locator(locator).innerText();
    }

    async hover(locator: string) {
        await this.page.locator(locator).hover();
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }


    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }

    async select(locator:string, value: string)
    {
        await this.page.locator(locator).selectOption(value);
    }

}