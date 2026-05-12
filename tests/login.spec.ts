import {test,expect} from '@playwright/test';
import { ManagePage } from '../pages/ManagePage.js';
test.describe('Login tests', () => {
    let managePage: ManagePage;
    test.beforeEach(async ({ page }) => {
        managePage = new ManagePage(page);
        await managePage.loginPage.openLoginPage();
    });
    test('should login successfully with valid credentials', async () => {
        await managePage.loginPage.userLogin('tomsmith', 'SuperSecretPassword!');
        await managePage.securePage.assertSuccess();
    });
    test('should fail to login with invalid username', async () => {
        await managePage.loginPage.userLogin('invalidUser', 'SuperSecretPassword!');
        await managePage.loginPage.assertFailedUsername();
    });
});