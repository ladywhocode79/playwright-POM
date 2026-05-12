import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

/**
 * SecurePage — POM for the /secure route, reachable only after a successful login.
 * Methods here cover the two user actions available on this page: confirming
 * the login succeeded and logging out.
 */
export class SecurePage extends BasePage {

    /**
     * Assert that the post-login flash banner is visible and contains the
     * expected success message. The locator is scoped to a local variable
     * rather than a class field because it is only used in this one method.
     */
    async assertSuccess() {
        const banner = this.page.locator('#flash');
        await this.basePageExpectToBeVisible(banner);
        await expect(banner).toContainText('You logged into a secure area!');
    }

    /**
     * Click the Logout link and assert the browser lands back on /login.
     * Uses getByRole for the click so the test stays aligned with what the
     * user actually sees, rather than relying on a fragile CSS selector.
     * basePageExpectToHaveURL is preferred over waitForURL because it also
     * runs Playwright's built-in retry logic and produces a clearer failure message.
     */
    async logout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
        await this.basePageExpectToHaveURL('/login');
    }
}