import { setWorldConstructor, IWorldOptions,World,setDefaultTimeout  } from "@cucumber/cucumber";
import {Page, Browser, chromium, BrowserContext} from 'playwright';
import { PageFixture } from "../../fixtures/page-fixtures";
setDefaultTimeout(60 * 1000);
export class CustomWorld extends World {
   public page!: Page;
   public browser!: Browser;
   public context!: BrowserContext;
   public pages!: PageFixture;   
   
   constructor(options: IWorldOptions) {
       super(options);
   }            
    async init() {
        this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext({
  recordVideo: { dir: 'videos/' },
});

        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
        });
        this.page = await this.context.newPage();
        this.pages = new PageFixture(this.page);
    }

    async close(){
        await this.page.close();
        await this.browser.close();
    }
    
}
setWorldConstructor(CustomWorld);



