// src/config/ConfigManager.ts
import * as dotenv from "dotenv";
import * as path from "path";
import { EnvConfig } from "../config/env.config";
import { logger } from '../../utils/logger'

// Load .env (local overrides)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export class ConfigManager {
  private static getEnv(): string {
    return process.env.ENV || "qa"; // Default to QA
  }

  private static getBrowser(): string {
    return process.env.BROWSER || "chromium";
  }

  private static getHeadless(): boolean {
    const isHeadless = process.env.CI === "true" || process.env.HEADLESS === "true";
    return isHeadless;
  }

  private static getBaseUrl(): string {
    const env = this.getEnv();
    // Prefer BASE_URL from CI/env, otherwise fall back to env.config.ts
    return process.env.BASE_URL ||EnvConfig[env as keyof typeof EnvConfig].baseUrl;
  }

  private static getCredentials(): { username: string; password: string } {
    const env = this.getEnv().toUpperCase(); // QA / STAGING / PROD

    const username = process.env[`${env}_USERNAME`];
    const password = process.env[`${env}_PASSWORD`];

    if (!username || !password) {
      throw new Error(`Missing credentials for environment: ${env}`);
    }

    return { username, password };
  }

  private static getCurrencyStymbol(): string {
    const env = this.getEnv();
    return EnvConfig[env as keyof typeof EnvConfig].currency || 'USD';
  }

  public static get(key: "env"): string;
  public static get(key: "browser"): string;
  public static get(key: "headless"): boolean;
  public static get(key: "baseUrl"): string;
  public static get(key: "currency"): string;
  public static get(key: "credentials"): { username: string; password: string };
  public static get(key: "env" | "browser" | "headless" | "baseUrl" | "credentials" | "currency"): any {
   switch (key) {
    case "env":
      return this.getEnv();
    case "browser":
      return this.getBrowser();
    case "headless":
      return this.getHeadless();
    case "baseUrl":
      return this.getBaseUrl();
    case "credentials":
      return this.getCredentials();
    case "currency":
      return this.getCurrencyStymbol();
    default:
      {
      logger.error(`Unknown config key:" ${key}`);
      throw new Error(`Unknown config key: ${key}`);
      }
  }
  }
}
