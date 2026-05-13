import {test as base} from '@playwright/test';
import {ManagePage} from "../pages/ManagePage.js";
import {valid_credentials} from '../test-data/valid_credentials.js';

/**
 * PomFixtures — declares the custom fixture types available to every test.
 *
 * pomManager — a fully initialised ManagePage instance scoped to the test's Page
 * valid_credentials  — a typed credential object loaded from test-data at runtime
 */
type PomFixtures = {
    pomManager: ManagePage;
    valid_credentials: { username: string; password: string };
};

/**
 * Extended test object — wraps Playwright's base `test` with the PomFixtures above.
 * Import this `test` (and `expect`) in spec files instead of the Playwright originals
 * so that fixtures are available without any per-test setup boilerplate.
 */
export const test = base.extend<PomFixtures>({
    // Create one ManagePage per test, bound to that test's Page instance.
    // Playwright tears it down automatically after `use` resolves.
    pomManager: async ({page}, use) => {
        const pomManager = new ManagePage(page);
        await use(pomManager);
    },

    // Inject the valid-credential object directly from the JSON file.
    // Using a fixture (rather than importing the JSON in each spec) keeps
    // credentials in one place and makes future parameterisation straightforward.
    valid_credentials: async ({}, use) => {
        await use(valid_credentials);
    }
});

// Re-export expect so spec files only need to import from this module
export {expect} from '@playwright/test';