import { test } from "@playwright/test";
import { ManagePage } from "../pages/ManagePage.js";

test.describe('Checkboxes tests', () => {
    let managePage: ManagePage;
    test.beforeEach(async ({ page }) => {
        managePage = new ManagePage(page);
        await managePage.checkBoxesPage.openCheckboxesPage();
    });
    test('should check the first checkbox and uncheck the second checkbox', async () => {
        await managePage.checkBoxesPage.checkFirstBox();
        await managePage.checkBoxesPage.uncheckSecondBox(); 
        await managePage.checkBoxesPage.assertCheckBoxesState(true, false);
    });
});