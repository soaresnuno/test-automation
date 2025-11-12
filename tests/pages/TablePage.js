import { expect } from "@playwright/test";
import {
  TABLE_PAGE,
  TABLE_COLUMNS,
  HOUSES,
  NAVIGATION,
} from "../data/table.js";

/**
 * Page Object Model for the Table Page
 */
export class TablePage {
  constructor(page) {
    this.page = page;

    // Headings and Text
    this.pageHeading = page.getByRole("heading", {
      name: TABLE_PAGE.heading,
    });
    this.descriptionText = page.getByText(TABLE_PAGE.description);

    // Table
    this.table = page.locator("table");
    this.tableHeaders = page.locator("thead th");
    this.tableRows = page.locator("tbody tr");

    // Navigation Links
    this.homeLink = page.getByRole("link", { name: NAVIGATION.homeLink });
    this.loginLink = page.getByRole("link", { name: NAVIGATION.loginLink });
    this.formLink = page.getByRole("link", { name: NAVIGATION.formLink });
    this.tableLink = page.getByRole("link", { name: NAVIGATION.tableLink });
    this.tasksLink = page.getByRole("link", { name: NAVIGATION.tasksLink });
    this.storeLink = page.getByRole("link", { name: NAVIGATION.storeLink });
    this.aboutLink = page.getByRole("link", { name: NAVIGATION.aboutLink });
  }

  /**
   * Navigate to the table page
   */
  async goto() {
    await this.page.goto("/table");
  }

  /**
   * Wait for table data to load
   * @param {number} [timeout=15000] - Timeout in milliseconds
   */
  async waitForTableData(timeout = 15000) {
    await this.page.waitForSelector("tbody tr", { timeout, state: "visible" });
  }

  /**
   * Verify the page title
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyTitle(timeout = 5000) {
    await expect(this.page).toHaveTitle(TABLE_PAGE.title, { timeout });
  }

  /**
   * Verify page heading is visible
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyHeading(timeout = 5000) {
    await expect(this.pageHeading).toBeVisible({ timeout });
  }

  /**
   * Verify description text is visible
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyDescription(timeout = 5000) {
    await expect(this.descriptionText).toBeVisible({ timeout });
  }

  /**
   * Verify table is visible
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyTableVisible(timeout = 5000) {
    await expect(this.table).toBeVisible({ timeout });
  }

  /**
   * Verify all table column headers are present
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyTableHeaders(timeout = 5000) {
    const headers = Object.values(TABLE_COLUMNS);
    for (const header of headers) {
      await expect(
        this.page.locator("thead th", { hasText: header })
      ).toBeVisible({ timeout });
    }
  }

  /**
   * Get the count of table rows
   * @returns {Promise<number>}
   */
  async getRowCount() {
    return await this.tableRows.count();
  }

  /**
   * Verify table has data rows
   * @param {number} [minRows=1] - Minimum expected rows
   */
  async verifyTableHasRows(minRows = 1) {
    const count = await this.getRowCount();
    expect(count).toBeGreaterThanOrEqual(minRows);
  }

  /**
   * Get all character names from the table
   * @returns {Promise<string[]>}
   */
  async getCharacterNames() {
    const rows = await this.tableRows.all();
    const names = [];
    for (const row of rows) {
      const nameCell = row.locator("td").nth(1);
      const name = await nameCell.textContent();
      names.push(name.trim());
    }
    return names;
  }

  /**
   * Get all houses from the table
   * @returns {Promise<string[]>}
   */
  async getHouses() {
    const rows = await this.tableRows.all();
    const houses = [];
    for (const row of rows) {
      const houseCell = row.locator("td").nth(2);
      const house = await houseCell.textContent();
      houses.push(house.trim());
    }
    return houses;
  }

  /**
   * Verify all houses are valid
   */
  async verifyValidHouses() {
    const houses = await this.getHouses();
    for (const house of houses) {
      if (house) {
        expect(HOUSES).toContain(house);
      }
    }
  }

  /**
   * Verify all rows have images
   */
  async verifyAllRowsHaveImages() {
    const rows = await this.tableRows.all();
    for (const row of rows) {
      const imageCell = row.locator("td").first();
      const image = imageCell.locator("img");
      await expect(image).toBeVisible();
    }
  }

  /**
   * Verify no empty name cells
   */
  async verifyNoEmptyNames() {
    const names = await this.getCharacterNames();
    for (const name of names) {
      expect(name).not.toBe("");
      expect(name.length).toBeGreaterThan(0);
    }
  }

  /**
   * Get table data for comparison (for testing randomization)
   * @returns {Promise<Array<{name: string, house: string, dob: string, actor: string}>>}
   */
  async getTableData() {
    const rows = await this.tableRows.all();
    const data = [];
    for (const row of rows) {
      const cells = await row.locator("td").all();
      if (cells.length >= 5) {
        data.push({
          name: (await cells[1].textContent()).trim(),
          house: (await cells[2].textContent()).trim(),
          dob: (await cells[3].textContent()).trim(),
          actor: (await cells[4].textContent()).trim(),
        });
      }
    }
    return data;
  }

  /**
   * Verify character exists in table
   * @param {string} characterName
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyCharacterExists(characterName, timeout = 5000) {
    await expect(
      this.page.locator("tbody td", { hasText: characterName })
    ).toBeVisible({ timeout });
  }

  /**
   * Click on navigation link
   * @param {string} linkName - Name of the link to click
   */
  async clickNavigationLink(linkName) {
    const link = this.page.getByRole("link", { name: linkName });
    await link.click();
  }

  /**
   * Navigate to home page
   */
  async navigateToHome() {
    await this.homeLink.click();
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.loginLink.click();
  }

  /**
   * Navigate to form page
   */
  async navigateToForm() {
    await this.formLink.click();
  }

  /**
   * Navigate to tasks page
   */
  async navigateToTasks() {
    await this.tasksLink.click();
  }

  /**
   * Navigate to store page
   */
  async navigateToStore() {
    await this.storeLink.click();
  }

  /**
   * Navigate to about page
   */
  async navigateToAbout() {
    await this.aboutLink.click();
  }

  /**
   * Verify navigation menu is visible
   * @param {number} [timeout=5000] - Timeout in milliseconds
   */
  async verifyNavigationVisible(timeout = 5000) {
    await expect(this.homeLink).toBeVisible({ timeout });
    await expect(this.loginLink).toBeVisible({ timeout });
    await expect(this.tableLink).toBeVisible({ timeout });
  }
}
