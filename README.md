# Playwright, Typescript with BDD framework
A clean, scalable end‑to‑end automation framework built using Playwright, Cucumber (BDD), TypeScript, and Allure Reporting. This framework supports parallel execution, Page Object Model, centralized test data, and environment-based configuration.

## Framework Features
- Built using Page Object Model (POM) for clean, scalable, and maintainable code.
- TypeScript used for strict typing and fewer runtime errors
- Reusable, loosely coupled utility functions following DRY and SRP.
- Storage state used to skip repeated login steps and speed up execution.

### Cumcuber for BDD
- Gherkin feature files for readable test scenarios.
- Clean step definitions
- Hooks for before/after scenarios
- World object for shared state

### Cross-browser and Multi-environment configuration
- Centralized configuration manager
- Supports multiple environments (dev/qa/stage)
- Environment-based credentials & test inputs
- Supports multiple browsers (chrome/webkit/firefox)


### Reporting features
- Allure reports showing pass/fail status, environment details, and user stories/features grouping.
- Automatic screenshots, trace files, and video embedded in allure reports on failures.
- Logger utility to track execution flow and errors.
- Reports hosted per build for easy access.

### Data-Driven
- Dedicated test data files to avoid hardcoding.
- Credentials stored securely in .env or CI secrets.


## Installation
Clone this repo
Run npm install.

## How to run tests locally
npm run test:report
This will run the test and lauches allure report

## How to run tests on github Actions
Select "Playwright cucumber test" workflow
Select the desired enviroment on which you want to run tests
Select the desired browser
Click run workflow



