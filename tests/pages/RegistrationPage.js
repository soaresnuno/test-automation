import { expect } from "@playwright/test";
import { SELECTORS, MESSAGES } from "../data/registration.js";

/**
 * Page Object Model for the Registration Page
 */
export class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Input fields
    this.nameInput = page.getByPlaceholder(SELECTORS.nameInput);
    this.emailInput = page.getByPlaceholder(SELECTORS.emailInput);
    this.passwordInput = page.getByPlaceholder(SELECTORS.passwordInput);
    this.countrySelect = page.locator(
      `select[name="${SELECTORS.countrySelect}"]`
    );

    // Buttons
    this.submitButton = page.getByRole("button", {
      name: SELECTORS.submitButton,
    });

    // Messages
    this.successMessage = page.getByText(MESSAGES.successfulRegistration);
    this.successHeading = page.getByText(MESSAGES.successHeading);
  }

  /**
   * Navigate to the registration page
   */
  async goto() {
    await this.page.goto("/form");
  }

  /**
   * Fill the name field
   * @param {string} name
   */
  async fillName(name) {
    await this.nameInput.fill(name);
  }

  /**
   * Fill the email field
   * @param {string} email
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Fill the password field
   * @param {string} password
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Select a country from the dropdown
   * @param {string} country
   */
  async selectCountry(country) {
    await this.countrySelect.selectOption({ label: country });
  }

  /**
   * Select a gender radio button
   * @param {string} gender - "Male", "Female", or "Other"
   */
  async selectGender(gender) {
    await this.page.getByText(gender, { exact: true }).click();
  }

  /**
   * Get a gender radio button locator
   * @param {string} value - "male", "female", or "other"
   */
  getGenderRadio(value) {
    return this.page.locator(`input[name="gender"][value="${value}"]`);
  }

  /**
   * Select hobbies checkboxes
   * @param {string[]} hobbies - Array of hobby names
   */
  async selectHobbies(hobbies) {
    for (const hobby of hobbies) {
      await this.page.getByText(hobby, { exact: true }).click();
    }
  }

  /**
   * Get a hobby checkbox by its label
   * @param {string} hobbyName
   */
  getHobbyCheckbox(hobbyName) {
    return this.page.getByRole("checkbox", { name: hobbyName });
  }

  /**
   * Get a hobby checkbox by its value
   * @param {string} value
   */
  getHobbyCheckboxByValue(value) {
    return this.page.locator(`input[name="hobbies"][value="${value}"]`);
  }

  /**
   * Fill the entire registration form
   * @param {Object} formData - Object containing form data
   * @param {string} [formData.name]
   * @param {string} [formData.email]
   * @param {string} [formData.password]
   * @param {string} [formData.country]
   * @param {string} [formData.gender]
   * @param {string[]} [formData.hobbies]
   */
  async fillForm(formData) {
    if (formData.name !== undefined) {
      await this.fillName(formData.name);
    }

    if (formData.email !== undefined) {
      await this.fillEmail(formData.email);
    }

    if (formData.password !== undefined) {
      await this.fillPassword(formData.password);
    }

    if (formData.country) {
      await this.selectCountry(formData.country);
    }

    if (formData.gender) {
      await this.selectGender(formData.gender);
    }

    if (formData.hobbies && formData.hobbies.length > 0) {
      await this.selectHobbies(formData.hobbies);
    }
  }

  /**
   * Submit the registration form
   */
  async submit() {
    await this.submitButton.click();
  }

  /**
   * Fill and submit the registration form
   * @param {Object} formData - Object containing form data
   */
  async register(formData) {
    await this.fillForm(formData);
    await this.submit();
  }

  /**
   * Verify successful registration
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifySuccessfulRegistration(timeout = 5000) {
    await expect(this.successMessage).toBeVisible({ timeout });
  }

  /**
   * Get all country options from the dropdown
   */
  async getCountryOptions() {
    return await this.countrySelect.locator("option").allTextContents();
  }
}
