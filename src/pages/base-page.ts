import {Locator, Page} from '@playwright/test';
import { Routes, RouteKey } from "../routes";
import { ConfigManager } from '../config/configManager';
import { logger } from '../../utils/logger';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToRoute(routeKey: RouteKey) {
        const baseUrl = ConfigManager.get("baseUrl");
        const route = Routes[routeKey];
        await this.page.goto(baseUrl + route);
        logger.info("Go To URL: " + baseUrl + route );
    }

    async click(locator: Locator) {
        await locator.click();
        logger.info(`Locator ${locator} is clicked`);
    }

    async type(locator: string, value: string) {
        await this.page.locator(locator).fill(value);
        logger.info(`Tying ${value} in Locator ${locator}`);
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