import {expect} from "@playwright/test";

export class Assert {
    /**
     * 
     * @param assertionFn - the async assertion logic
     * @param message - optional custom message for clarity.
     */
    static async that (
        assertionFn: () => Promise<void> | void, message?: string
    )
    {
        try {
            await assertionFn();
        }
        catch (err: unknown) {
            const error = err instanceof Error ? err : new Error(String(err));

            const isPlaywrightAssertion = 
        error.name?.includes("AssertionError") ||
        error.message?.includes("expect(") ||
        error.message?.includes("toBe") ||
        error.message?.includes("toEqual") ||
        error.message?.includes("toContain") ||
        error.message?.includes("toHave") ||
        error.message?.includes("toMatch") ||
        error.message?.includes("visible") ||
        error.message?.includes("not ");
             if(isPlaywrightAssertion) {
                // Re-throw cleanly so Allure marks it as FAILED
                throw new Error(`Assertion failed: ${message ? message + " - " : ""}${error.message}`);
             }
             else {
                // Handle unexpected runtime errors
                console.error("Unexpected error:", error);
                throw new Error(`Unexpected error: ${error.message}`)    ;
    }
    }
 
  }
}