import { BasePage } from "./BasePage.js";
import {expect, type Locator,  type Page} from '@playwright/test';

export class CheckBoxesPage extends BasePage {
    /**
     * Reusable locators — resolved once in the constructor and shared across
     * all methods. Declaring them as `protected readonly` lets sub-classes
     * reference them while preventing accidental reassignment.
     *
     * firstBox  — first  <input> inside form#checkboxes (index 0)
     * secondBox — second <input> inside form#checkboxes (index 1)
     * form      — the wrapping <form> element; used to confirm the page loaded
     */
    protected readonly firstBox:Locator;
    protected readonly secondBox:Locator;
    protected readonly form:Locator;

    constructor(page:Page) {
        super(page);
        // nth(0/1) scopes each locator to a specific checkbox without hard-coding
        // a unique selector that could break if the DOM order changes
        this.firstBox = page.locator('form#checkboxes input').nth(0);
        this.secondBox = page.locator('form#checkboxes input').nth(1);
        this.form = this.page.locator('#checkboxes');
    }
    async openCheckboxesPage() {
        await this.navigateTo('/checkboxes');
        await this.basePageExpectToBeVisible(this.form);

    }
    async checkFirstBox() {
        await this.firstBox.check();
        await expect(this.firstBox).toBeChecked();
    }
    async uncheckFirstBox() {
        await this.firstBox.uncheck();
        await expect(this.firstBox).not.toBeChecked();
    }
    async checkSecondBox() {
        await this.secondBox.check();
        await expect(this.secondBox).toBeChecked();
    }
    async uncheckSecondBox() {
        await this.secondBox.uncheck();
        await expect(this.secondBox).not.toBeChecked();
    }
    async assertCheckBoxesState(firstBoxChecked: boolean, secondBoxChecked: boolean) {
        await expect(this.firstBox).toBeChecked({ checked: firstBoxChecked });
        await expect(this.secondBox).toBeChecked({ checked: secondBoxChecked });
    }
}