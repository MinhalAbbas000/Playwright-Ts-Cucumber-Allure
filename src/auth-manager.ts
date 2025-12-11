import {existsSync, stat, statSync } from 'fs'
import {Page, Browser, chromium, firefox,webkit, BrowserContext} from 'playwright';
import { ConfigManager } from './config/configManager';

const AUTH_FILE = 'auth.json';
const MAX_AGE_MS = 1000*60*60;

export async function ensureAuth()
{
    const needsRefresh = !existsSync(AUTH_FILE) || isExpired(AUTH_FILE);
     
  if (needsRefresh) {
    console.log("🔄 Refreshing auth.json...");
    await generateAuth();
  } else {
    console.log("✅ auth.json is fresh, reusing existing state");
  }
}

function isExpired(path:string):boolean {
    const stats = statSync(path);
    const age = Date.now() - stats.mtimeMs;
    return age > MAX_AGE_MS;
}

async function generateAuth()
{
    console.log("🔥 Global setup started");

    const browserName = ConfigManager.get("browser");
    const baseUrl = ConfigManager.get("baseUrl");
    const credentials = ConfigManager.get("credentials");

    // launch appropriate browser
    const browsers = { chromium, firefox, webkit };
    const browserType = browsers[browserName as keyof typeof browsers];

    const browser = await browserType.launch({ headless:true,slowMo:1000});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseUrl);
    await page.fill('#user-name',credentials.username);
    await page.fill('#password',credentials.password);
    await page.click('#login-button');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    await context.storageState({ path: 'auth.json' });
    await browser.close();

}