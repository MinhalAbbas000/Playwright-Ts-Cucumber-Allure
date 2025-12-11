import {Before, After, BeforeAll, AfterAll, Status} from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { CustomWorld } from './world';
import { logger } from '../../utils/logger';
import { EnvConfig } from "../config/env.config";
import { ConfigManager } from '../config/configManager';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


BeforeAll(async function () {
  const allureResults = path.resolve("./allure-results");
  const allureReport = path.resolve("./allure-report");


  // Preserve Allure history before cleaning
  const historySrc = path.join(allureReport, "history");
  const historyDest = path.join(allureResults, "history");

  if (fs.existsSync(historySrc)) {
    await fs.promises.mkdir(allureResults, { recursive: true });
    fs.cpSync(historySrc, historyDest, { recursive: true });
  }

  // Clean previous run data except history
  const items = await fs.promises.readdir(allureResults).catch(() => []);
  for (const item of items) {
    if (item !== "history" && item!=="categories.json") {
      await fs.promises.rm(path.join(allureResults, item), { recursive: true, force: true });
    }
  }

  logger.info("Cleaned allure-results (kept history if present)");

  await fs.promises.mkdir(allureResults, { recursive: true });
  
// Created environment details file
   const envDetails = `
   Browser=${ConfigManager.get('browser')}
   Environment=${ConfigManager.get('baseUrl')}
   Headless=${ConfigManager.get('headless')}
   OS=${process.platform}
   NodeVer=${process.version}
   BuildNumber=${process.env.GITHUB_RUN_NUMBER || "local-run"}`.trim();

   await fs.promises.writeFile(path.join(allureResults,"environment.properties"),envDetails,'utf-8');
   logger.info("Allure Environment details file is created");

  // Created executor file for CI details
    const isCI = process.env.GITHUB_ACTIONS === "true";

    const executorJson = isCI? {
    name: "GitHub Actions",
    type: "github",
    buildName: `GitHub Run #${process.env.GITHUB_RUN_NUMBER}`,
    buildOrder: Number(process.env.GITHUB_RUN_NUMBER),
    buildUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
    reportUrl: "", // You can fill this if you host your Allure report publicly
    url: `https://github.com/${process.env.GITHUB_REPOSITORY}`
  }:
  {
    name: "Local Machine",
    type: "local",
    buildName: "Local Run",
    buildOrder: 0,
    buildUrl: "",
    reportUrl: "",
    url: "http://localhost"
  }

    fs.writeFileSync(
    path.join(allureResults, "executor.json"),
    JSON.stringify(executorJson, null, 2),
    "utf-8"
  );
  logger.info("Allure executor details file is created");

  // Copy categories folder
  const masterCategories = path.resolve("./src/allureConfig/categories.json");
  const destCategories = path.join(allureResults, "categories.json");

  await fs.promises.copyFile(masterCategories, destCategories);

});

Before(async function (this: CustomWorld,scenario) {
    logger.info(`--- Starting Scenario : ${scenario.pickle.name} : ${scenario.pickle.id} ---`);
    await this.init();
});

After(async function (this: CustomWorld, scenario) {
  const scenarioName = scenario.pickle.name.replace(/\s+/g, "_");
  const reportsDir = path.resolve("./reports");
  const tracesDir = path.join(reportsDir, "traces");
  const screenshotsDir = path.join(reportsDir, "screenshots");
  const videosDir = path.join(reportsDir, "videos");

  await fs.promises.mkdir(tracesDir, { recursive: true });
  await fs.promises.mkdir(screenshotsDir, { recursive: true });
  await fs.promises.mkdir(videosDir, { recursive: true });
if (scenario.result?.status === Status.FAILED && this.page) { 

const screenshotPath = path.join(screenshotsDir, `${scenarioName}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    await this.attach(fs.readFileSync(screenshotPath), "image/png");

    const tracePath = path.join(tracesDir, `${scenarioName}.zip`);
    await this.context.tracing.stop({ path: tracePath });
    const traceBuffer = fs.readFileSync(tracePath);
   await this.attach(traceBuffer, "application/zip");
   await this.attach(`Trace file: ${tracePath}`);
     const videoPath = await this.page.video()?.path();
    if (videoPath) {
        await this.close();
        await delay(1000);
      const finalVideoPath = path.join(videosDir, `${scenarioName}.webm`);
      try {
       await fs.promises.rename(videoPath, finalVideoPath);
        const videoBuffer = fs.readFileSync(finalVideoPath);
        await this.attach(videoBuffer, "video/webm");
      } catch (err) {
        console.error("Video move failed:", err);
      }
    }
  } else {
    // Stop trace if not already stopped
    try {
      await this.context.tracing.stop();
    } catch (e) {}
  }
    await this.close();
});

AfterAll(async function() {
  // Remove the auth file
    try {
    await fs.promises.rm('auth.json');
    console.log('auth.json deleted after all tests');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      // file does not exist, ignore
      console.log('auth.json not found, skipping delete');
    } else {
      throw err;
    }
  }
})
{

}


