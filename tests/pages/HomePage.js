import { expect } from "@playwright/test";
import { HOMEPAGE, NAVIGATION } from "../data/home.js";

/**
 * Page Object Model for the Home Page
 */
export class HomePage {
  constructor(page) {
    this.page = page;

    // Headings and Text
    this.mainHeading = page.getByRole("heading", {
      name: HOMEPAGE.heading,
    });
    this.descriptionText = page.getByText(HOMEPAGE.description);

    // Navigation Links
    this.loginLink = page.getByRole("link", {
      name: NAVIGATION.loginLink,
    });
  }

  /**
   * Navigate to the home page
   */
  async goto() {
    await this.page.goto("/");
  }

  /**
   * Verify the page title
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyTitle(timeout = 5000) {
    await expect(this.page).toHaveTitle(HOMEPAGE.title, { timeout });
  }

  /**
   * Verify main heading is visible
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyMainHeading(timeout = 5000) {
    await expect(this.mainHeading).toBeVisible({ timeout });
  }

  /**
   * Verify description text is visible
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyDescription(timeout = 5000) {
    await expect(this.descriptionText).toBeVisible({ timeout });
  }

  /**
   * Click on the Login navigation link
   */
  async clickLoginLink() {
    await this.loginLink.click();
  }

  /**
   * Verify user is redirected to login page
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyLoginPageRedirect(timeout = 5000) {
    await expect(
      this.page.getByRole("heading", { name: NAVIGATION.loginHeading })
    ).toBeVisible({ timeout });
  }

  /**
   * Navigate to login page via link
   */
  async navigateToLogin() {
    await this.clickLoginLink();
    await this.verifyLoginPageRedirect();
  }
}
