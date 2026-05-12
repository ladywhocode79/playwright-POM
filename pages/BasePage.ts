import {Page,Locator,expect} from '@playwright/test';

/**
 * BasePage — abstract base class for all Page Object Models.
 * Provides shared navigation, interaction, and assertion helpers
 * so individual page classes stay focused on their own selectors and flows.
 */
export abstract class BasePage {
    constructor(protected page: Page) {}

    /** Navigation */
    // Navigate to an absolute or relative URL
    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    /**
     * Normalises a selector argument to a Locator.
     * Accepts a CSS/XPath string or an already-resolved Locator,
     * keeping action helpers DRY without forcing callers to pre-resolve.
     */
    protected toLocator(selector: string | Locator): Locator {
        return typeof selector === 'string' ?
        this.page.locator(selector) : selector;
    }

    /** Common Actions */
    // Click an element identified by a string selector or Locator
    protected async basePageClick(selector: string | Locator) {
        await this.toLocator(selector).click();
    }

    // Clear and type a value into an input field
    protected async basePageFill(selector: string | Locator, value: string) {
        await this.toLocator(selector).fill(value);
    }

    /** Common Assertions */
    // Assert that an element is visible in the viewport
    protected async basePageExpectToBeVisible(selector: string | Locator) {
        await expect(this.toLocator(selector)).toBeVisible();
    }

    // Assert that an element's text content matches the expected string
    protected async basePageExpectToHaveText(selector: string | Locator, text: string) {
        await expect(this.toLocator(selector)).toHaveText(text);
    }

    // Assert that the current page URL matches the expected value
    protected async basePageExpectToHaveURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }
}