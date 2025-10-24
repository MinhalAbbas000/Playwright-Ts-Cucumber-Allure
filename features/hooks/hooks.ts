import {Before, After, BeforeAll, AfterAll, Status} from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { CustomWorld } from './world';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



After(async function (this: CustomWorld) {
    await this.close();
});

Before(async function (this: CustomWorld) {
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


