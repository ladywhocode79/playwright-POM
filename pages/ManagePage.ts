import { BasePage } from "./BasePage.js";
import { LoginPage } from "./LoginPage.js";
import { SecurePage } from "./SecurePage.js";
import { CheckBoxesPage } from "./CheckBoxesPage.js";
import type { Page } from "playwright/types/test";

/**
 * ManagePage — central factory / facade for all page objects in the suite.
 * Tests instantiate only this class and access individual pages through its
 * getters, so they never construct page objects directly.
 *
 * Each page object is created lazily on first access and then cached in its
 * backing private field. This means there is no upfront cost for pages a test
 * never visits, while still sharing a single instance per test run.
 */
export class ManagePage extends BasePage {
    // Backing fields — undefined until the corresponding getter is first called
    private _loginPage?: LoginPage;
    private _securePage?: SecurePage;
    private _checkBoxesPage?: CheckBoxesPage;

    constructor(page: Page) {
        super(page);
    }

    // Lazy-initialise LoginPage and return the cached instance on subsequent calls
    get loginPage(): LoginPage {
        if (!this._loginPage) {
            this._loginPage = new LoginPage(this.page);
        }
        return this._loginPage;
    }

    // Lazy-initialise SecurePage and return the cached instance on subsequent calls
    get securePage(): SecurePage {
        if (!this._securePage) {
            this._securePage = new SecurePage(this.page);
        }
        return this._securePage;
    }

    // Lazy-initialise CheckBoxesPage and return the cached instance on subsequent calls
    get checkBoxesPage(): CheckBoxesPage {
        if (!this._checkBoxesPage) {
            this._checkBoxesPage = new CheckBoxesPage(this.page);
        }
        return this._checkBoxesPage;
    }
}