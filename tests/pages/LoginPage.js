import { expect } from "@playwright/test";
import { SELECTORS, MESSAGES } from "../data/login.js";

/**
 * Page Object Model for the Login Page
 */
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Input fields
    this.usernameInput = page.getByRole("textbox", {
      name: SELECTORS.usernameInput,
    });
    this.passwordInput = page.getByRole("textbox", {
      name: SELECTORS.passwordInput,
    });

    // Buttons
    this.loginButton = page.getByRole("button", {
      name: SELECTORS.loginButton,
    });
    this.logoutButton = page.getByRole("button", {
      name: SELECTORS.logoutButton,
    });

    // Headings and Messages
    this.loginHeading = page.getByRole("heading", {
      name: SELECTORS.loginHeading,
    });
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto("/login");
  }

  /**
   * Fill the username field
   * @param {string} username
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill the password field
   * @param {string} password
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Fill the entire login form
   * @param {Object} credentials
   * @param {string} credentials.username
   * @param {string} credentials.password
   */
  async fillForm(credentials) {
    if (credentials.username !== undefined) {
      await this.fillUsername(credentials.username);
    }

    if (credentials.password !== undefined) {
      await this.fillPassword(credentials.password);
    }
  }

  /**
   * Click the login button
   */
  async submit() {
    await this.loginButton.click();
  }

  /**
   * Fill and submit the login form
   * @param {Object} credentials
   * @param {string} credentials.username
   * @param {string} credentials.password
   */
  async login(credentials) {
    await this.fillForm(credentials);
    await this.submit();
  }

  /**
   * Click the logout button
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Verify successful login message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifySuccessfulLogin(timeout = 5000) {
    await expect(this.page.getByText(MESSAGES.successfulLogin)).toBeVisible({
      timeout,
    });
  }

  /**
   * Verify user authenticated message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyUserAuthenticated(timeout = 5000) {
    await expect(this.page.getByText(MESSAGES.userAuthenticated)).toBeVisible({
      timeout,
    });
  }

  /**
   * Verify blocked user message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyBlockedUser(timeout = 5000) {
    await expect(this.page.getByText(MESSAGES.blockedUser)).toBeVisible({
      timeout,
    });
  }

  /**
   * Verify user not found message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyUserNotFound(timeout = 5000) {
    await expect(this.page.getByText(MESSAGES.userNotFound)).toBeVisible({
      timeout,
    });
  }

  /**
   * Verify incorrect credentials message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyIncorrectCredentials(timeout = 5000) {
    await expect(
      this.page.getByText(MESSAGES.incorrectCredentials)
    ).toBeVisible({ timeout });
  }

  /**
   * Verify temporary block message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyTemporaryBlock(timeout = 5000) {
    await expect(this.page.getByText(MESSAGES.temporaryBlock)).toBeVisible({
      timeout,
    });
  }

  /**
   * Verify logged out message is displayed
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyLoggedOut(timeout = 5000) {
    await expect(this.page.getByText(MESSAGES.loggedOut)).toBeVisible({
      timeout,
    });
  }

  /**
   * Verify a specific message is displayed
   * @param {string} message - The message text to verify
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyMessage(message, timeout = 5000) {
    await expect(this.page.getByText(message)).toBeVisible({ timeout });
  }

  /**
   * Check if user is logged in (logout button is visible)
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    return await this.logoutButton.isVisible();
  }
}
