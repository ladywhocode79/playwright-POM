import {test} from "../fixtures/pom.fixtures.ts";
test.describe('Login failure tests', () => {
    test('should display an error message for invalid credentials', async ({pomManager}) => {
        await pomManager.loginPage.openLoginPage();
        await pomManager.loginPage.userLogin('invalid_user', 'invalid_pass');
        await pomManager.loginPage.assertFailedUsername();
    });
});