import { setWorldConstructor, IWorldOptions,World,setDefaultTimeout  } from "@cucumber/cucumber";
import {Page, Browser, chromium, BrowserContext} from 'playwright';
import { PageManager } from "../pages/pageManager";

setDefaultTimeout(60 * 1000);
export class CustomWorld extends World {
    
   public page!: Page;
   public browser!: Browser;
   public context!: BrowserContext;
   public pages!: PageManager;   
   
   constructor(options: IWorldOptions) {
       super(options);
   }            
    async init() {
        const isHeadless = process.env.CI === "true" || process.env.HEADLESS === "true";
        this.browser = await chromium.launch({ headless: isHeadless });
        this.context = await this.browser.newContext({
        recordVideo: { dir: 'videos/' },
});

        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
        });
        this.page = await this.context.newPage();
       // this.pages = new PageFixture(this.page);
        this.pages = new PageManager(this.page);
    }

    async close(){
        await this.page.close();
        await this.browser.close();
    }
    
}
setWorldConstructor(CustomWorld);



