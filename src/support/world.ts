import { setWorldConstructor, IWorldOptions,World,setDefaultTimeout  } from "@cucumber/cucumber";
import {Page, Browser, chromium, firefox,webkit, BrowserContext} from 'playwright';
import { PageManager } from "../pages/pageManager";
import * as dotenv from "dotenv";
import * as path from "path";
import { ConfigManager } from "../config/configManager";
import { TestContext } from "../types";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });


setDefaultTimeout(60 * 1000);
export class CustomWorld extends World {
    
   public page!: Page;
   public browser!: Browser;
   public context!: BrowserContext;
   public pages!: PageManager;  
   public testContext!: TestContext; 
   
   constructor(options: IWorldOptions) {
       super(options);
   }            
    async init() {
        const env = ConfigManager.get("env");
        const browserName = ConfigManager.get("browser");
        const isheadless = ConfigManager.get("headless") as boolean;
        const baseUrl = ConfigManager.get("baseUrl");

        const browsers = { chromium, firefox, webkit };
        const browserType = browsers[browserName as keyof typeof browsers];
        console.log(`Running on ENV=${env}, BROWSER=${browserName}, HEADLESS=${isheadless}`);

        this.browser = await browserType.launch({ headless:isheadless,slowMo:1000});
        this.context = await this.browser.newContext({
        recordVideo: { dir: 'videos/' },
});

        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
        });
        this.page = await this.context.newPage();

        this.pages = new PageManager(this.page);
        this.testContext = {
            productsInCart: [],
            currentUser: null,
            currentProductName: null

        }
    }

    async close(){
        await this.page.close();
        await this.browser.close();
    }
    
}
setWorldConstructor(CustomWorld);



