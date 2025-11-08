import { test as base } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage.js";

/**
 * Custom fixtures for registration tests
 * Extends the base Playwright test with a registrationPage fixture
 */
export const test = base.extend({
  /**
   * registrationPage fixture - automatically creates and navigates to the registration page
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {Function} use - Function to use the fixture
   */
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await use(registrationPage);
  },

  /**
   * registrationPageWithoutNavigation fixture - creates the page object without navigating
   * Useful when you want to control navigation timing manually
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {Function} use - Function to use the fixture
   */
  registrationPageWithoutNavigation: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
});

export { expect } from "@playwright/test";
