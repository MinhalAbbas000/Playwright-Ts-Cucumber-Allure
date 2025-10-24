import { generate } from 'cucumber-html-reporter';

generate({
  theme: "bootstrap",
  jsonFile: "reports/cucumber-report.json",
  output: 'reports/cucumber-report.html',
  screenshotsDirectory:'screenshots',
  storeScreenshots: true,
  reportSuiteAsScenarios: false,
  launchReport: true,
  metadata:{
    "App Version": "1.0",
    "Test Environment": "Staging",
    "Browser": "Chrome",
    "Platform": "Windows 11",
    "Executed": "Local"
  }
});