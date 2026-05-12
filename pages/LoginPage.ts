import { BasePage } from "./BasePage.js";
import { expect} from "@playwright/test";

/**
 * LoginPage — POM for the /login route.
 * Selectors are passed inline to the BasePage helpers rather than stored as
 * class-level Locators, because this page has no selectors shared across
 * multiple methods.
 */
export class LoginPage extends BasePage {

    // Navigate to the login page
    async openLoginPage() {
        await this.navigateTo('/login');
    }

    /**
     * Fill credentials and submit the login form.
     * Accepts username and password as parameters so the same method can be
     * reused for valid-login, invalid-username, and invalid-password scenarios.
     */
    async userLogin(username: string, password: string) {
        await this.basePageFill('#username', username);
        await this.basePageFill('#password', password);
        await this.basePageClick('button[type="submit"]');
    }

    // Assert that the flash banner is visible and contains the invalid-username message
    async assertFailedUsername(){
        await this.basePageExpectToBeVisible(this.page.locator('#flash'));
        await expect(this.page.locator('#flash')).toContainText('Your username is invalid!');
    }
}