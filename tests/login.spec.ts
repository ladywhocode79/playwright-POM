// Import the custom test and expect from the fixture module, not from Playwright
// directly, so that pomManager and validUser are available as named fixtures
import {test} from '../fixtures/pom.fixtures.js';

/**
 * Login tests — covers successful and failed authentication flows.
 * All page interactions are delegated to page objects via pomManager,
 * keeping the spec free of selectors and low-level Playwright calls.
 */
test.describe('Login tests', () => {

    // Happy path: valid credentials should land the user on the secure area
    test('should login successfully with valid credentials', async ({ pomManager, valid_credentials }) => {
        await pomManager.loginPage.openLoginPage();
        await pomManager.loginPage.userLogin(valid_credentials.username, valid_credentials.password);
        await pomManager.securePage.assertSuccess();
    }); 

    // Sad path: an invalid username should show an error banner on the login page
    test('should fail to login with invalid username', async ({ pomManager }) => {
        // No need to navigate first — openLoginPage is skipped to test the
        // error state directly; the app redirects unauthenticated requests to /login
        await pomManager.loginPage.openLoginPage();
        await pomManager.loginPage.userLogin('invalidUser', 'SuperSecretPassword!');
        await pomManager.loginPage.assertFailedUsername();
    });
});