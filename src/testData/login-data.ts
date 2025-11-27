import { ConfigManager } from '../config/configManager';
import type { LoginData } from "../types"
const { username, password } = ConfigManager.get("credentials") || {};
export const loginData: LoginData = {
  validUser: {
    username: username || "",
    password: password || ""
  },
  invalidUser: {
    username: "invaliduser",
    password: "wrongpassword"
  },
  emptyUser: {
    username: "",
    password: "",
  }
};