# Playwright POM Test Suite

![Tests](https://github.com/<owner>/<repo>/actions/workflows/playwright.yml/badge.svg)

A **Page Object Model (POM)** test automation suite built with Playwright and TypeScript. This project demonstrates best practices for organizing UI tests using the POM pattern, with shared fixtures, reusable selectors, and clean separation of concerns.

## Project Structure

```
playwright-POM/
├── pages/              # Page Object classes
│   ├── BasePage.ts     # Abstract base with shared helpers
│   ├── LoginPage.ts    # Login page interactions
│   ├── SecurePage.ts   # Secure area after login
│   ├── CheckBoxesPage.ts # Checkbox interactions
│   └── ManagePage.ts   # Facade for all pages
├── fixtures/
│   └── pom-fixtures.ts # Custom test fixtures (pomManager, validUser)
├── tests/
│   └── login.spec.ts   # Login test scenarios
├── test-data/
│   ├── valid_credentials.json # Test credentials (JSON)
│   └── valid_credentials.ts   # Test credentials (TS with env vars)
├── .github/workflows/
│   └── playwright.yml  # CI/CD configuration
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites
- **Node.js**: LTS version (v18+)
- **npm**: v9+

### Installation

```bash
npm ci
```

Install Playwright browser binaries and OS-level dependencies:

```bash
npx playwright install --with-deps
```

### Setup Test Data

Create a `.env` file in the project root with your test credentials:

```env
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
BASE_URL=http://localhost:7001  # optional
```

Or configure these as GitHub Secrets (Settings → Secrets and variables → Actions) for CI/CD.

## Running Tests

### Run all tests
```bash
npm test
```

### Run with UI mode (interactive browser)
```bash
npm run test:ui
```

### Generate and view the HTML report
```bash
npm run test:report
```

## CI/CD

Tests run automatically on every push to `main` or `master` branches via GitHub Actions. The workflow:
1. Checks out the code
2. Installs dependencies and Playwright browsers
3. Runs all tests
4. Uploads the HTML report as an artifact (even on failure)

### Test Status Badge

Update the badge URL in this README to point to your repository:

```markdown
![Tests](https://github.com/YOUR_ORG/YOUR_REPO/actions/workflows/playwright.yml/badge.svg)
```

## Architecture

### Page Object Model Pattern

Each page is encapsulated in its own class (e.g., `LoginPage`, `SecurePage`) that:
- **Owns selectors** — CSS/XPath strings live here, not in tests
- **Exposes actions** — public async methods for user interactions (e.g., `userLogin()`)
- **Provides assertions** — methods like `assertSuccess()` keep tests readable
- **Inherits helpers** — common methods from `BasePage` (click, fill, expect visibility, etc.)

### Fixtures

Custom Playwright fixtures (`pomManager`, `validUser`) are defined in `pom-fixtures.ts`:
- **pomManager** — a facade that instantiates page objects on-demand and caches them per test
- **validUser** — test credentials loaded from `valid_credentials.json` or environment variables

Spec files import from `pom-fixtures.ts` (not Playwright directly) to keep setup boilerplate out of tests.

### Test Example

```typescript
test('should login successfully with valid credentials', async ({ pomManager, validUser }) => {
    await pomManager.loginPage.openLoginPage();
    await pomManager.loginPage.userLogin(validUser.username, validUser.password);
    await pomManager.securePage.assertSuccess();
});
```

No selectors. No low-level Playwright calls. Just business logic.

## Configuration

### playwright.config.ts
Defines test settings: browsers, timeouts, screenshot/video capture, reporters, etc.

### tsconfig.json
TypeScript compiler options. Covers `tests/` and `playwright.config.ts`; other directories are included transitively via imports.

### package.json
Scripts and dependencies. `devDependencies` includes `@playwright/test` and `@types/node`.

## Best Practices Used

✅ **Separation of Concerns** — Page objects own selectors; tests own assertions  
✅ **Lazy Initialization** — Page objects created only when used  
✅ **Reusable Helpers** — `BasePage` provides common actions (click, fill, expect)  
✅ **Type Safety** — Full TypeScript with fixture typing  
✅ **Fixture Injection** — Credentials and page objects injected, not hardcoded  
✅ **CI/CD Integration** — GitHub Actions workflow with artifact uploads  
✅ **Clear Comments** — JSDoc and inline notes throughout the codebase  

## Troubleshooting

**Tests fail locally but pass in CI:**
- Ensure `BASE_URL` is set correctly
- Check that test credentials in `.env` match the test environment

**TypeScript errors on `process.env`:**
- Ensure `@types/node` is installed: `npm ci`
- If editing files outside `tests/`, add `/// <reference types="node" />` at the top

**Playwright browser binaries missing:**
- Run: `npx playwright install --with-deps`

## Contributing

1. Add page objects for new pages in `pages/`
2. Extend `BasePage` for shared functionality
3. Add test specs in `tests/`
4. Use the `pomManager` fixture to access pages
5. Run `npm test` before pushing
