import { test, expect } from "@playwright/test";
import {
  FORM_DATA,
  MESSAGES,
  SELECTORS,
  HOBBIES,
} from "./data/registration.js";

/**
 * Helper function to fill the registration form
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} formData - Form data to fill
 */
async function fillRegistrationForm(page, formData) {
  // Fill name field
  if (formData.name !== undefined) {
    await page.getByPlaceholder(SELECTORS.nameInput).fill(formData.name);
  }

  // Fill email field
  if (formData.email !== undefined) {
    await page.getByPlaceholder(SELECTORS.emailInput).fill(formData.email);
  }

  // Fill password field
  if (formData.password !== undefined) {
    await page
      .getByPlaceholder(SELECTORS.passwordInput)
      .fill(formData.password);
  }

  // Select country
  if (formData.country) {
    await page.selectOption(`select[name="${SELECTORS.countrySelect}"]`, {
      label: formData.country,
    });
  }

  // Select gender
  if (formData.gender) {
    await page.getByText(formData.gender, { exact: true }).click();
  }

  // Select hobbies
  if (formData.hobbies && formData.hobbies.length > 0) {
    for (const hobby of formData.hobbies) {
      await page.getByText(hobby, { exact: true }).click();
    }
  }
}

/**
 * Helper function to submit the registration form
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function submitForm(page) {
  await page.getByRole("button", { name: SELECTORS.submitButton }).click();
}

test.describe("Registration Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/form");
  });

  test.describe("Successful Registration", () => {
    test("✅ Complete registration with all required fields", async ({
      page,
    }) => {
      await test.step("Fill in all required fields", async () => {
        await fillRegistrationForm(page, FORM_DATA.valid);
      });

      await test.step("Submit the registration form", async () => {
        await submitForm(page);
      });

      await test.step("Verify successful registration message", async () => {
        // Wait for success message or any confirmation
        // Note: Update the selector based on actual success message from the application
        await expect(
          page.getByText(MESSAGES.successfulRegistration)
        ).toBeVisible({ timeout: 5000 });
      });
    });

    test("✅ Registration with minimal required fields (no hobbies)", async ({
      page,
    }) => {
      await test.step("Fill only required fields without hobbies", async () => {
        await fillRegistrationForm(page, FORM_DATA.validMinimal);
      });

      await test.step("Submit the registration form", async () => {
        await submitForm(page);
      });

      await test.step("Verify successful registration", async () => {
        await expect(
          page.getByText(MESSAGES.successfulRegistration)
        ).toBeVisible({ timeout: 5000 });
      });
    });

    test("✅ Registration with all hobbies selected", async ({ page }) => {
      await test.step("Fill all fields including all hobbies", async () => {
        await fillRegistrationForm(page, FORM_DATA.validWithAllHobbies);
      });

      await test.step("Submit the registration form", async () => {
        await submitForm(page);
      });

      await test.step("Verify successful registration", async () => {
        await expect(
          page.getByText(MESSAGES.successfulRegistration)
        ).toBeVisible({ timeout: 5000 });
      });
    });

    test("✅ Verify all hobby checkboxes are selectable", async ({ page }) => {
      await test.step("Select each hobby checkbox", async () => {
        for (const hobby of HOBBIES) {
          const checkbox = page.getByRole("checkbox", { name: hobby });
          await expect(checkbox).toBeVisible();
          await checkbox.check();
          await expect(checkbox).toBeChecked();
        }
      });

      await test.step("Fill remaining required fields", async () => {
        await fillRegistrationForm(page, {
          name: FORM_DATA.valid.name,
          email: FORM_DATA.valid.email,
          password: FORM_DATA.valid.password,
          country: FORM_DATA.valid.country,
          gender: FORM_DATA.valid.gender,
        });
      });

      await test.step("Submit the form", async () => {
        await submitForm(page);
      });

      await test.step("Verify successful registration", async () => {
        await expect(
          page.getByText(MESSAGES.successfulRegistration)
        ).toBeVisible({ timeout: 5000 });
      });
    });
  });

  test.describe("Form Field Interactions", () => {
    test("🔄 Verify all gender radio buttons work correctly", async ({
      page,
    }) => {
      await test.step("Select Male gender", async () => {
        const maleRadio = page.locator('input[name="gender"][value="male"]');
        await maleRadio.check();
        await expect(maleRadio).toBeChecked();
      });

      await test.step("Select Female gender", async () => {
        const femaleRadio = page.locator(
          'input[name="gender"][value="female"]'
        );
        await femaleRadio.check();
        await expect(femaleRadio).toBeChecked();

        // Verify Male is no longer checked
        const maleRadio = page.locator('input[name="gender"][value="male"]');
        await expect(maleRadio).not.toBeChecked();
      });

      await test.step("Select Other gender", async () => {
        const otherRadio = page.locator('input[name="gender"][value="other"]');
        await otherRadio.check();
        await expect(otherRadio).toBeChecked();

        // Verify Female is no longer checked
        const femaleRadio = page.locator(
          'input[name="gender"][value="female"]'
        );
        await expect(femaleRadio).not.toBeChecked();
      });
    });

    test("🔄 Verify hobby checkboxes can be toggled", async ({ page }) => {
      await test.step("Check and uncheck a hobby", async () => {
        const checkbox = page.locator('input[name="hobbies"][value="gaming"]');

        // Check the checkbox
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // Uncheck the checkbox
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      });
    });

    test("🔄 Verify country dropdown displays all options", async ({
      page,
    }) => {
      await test.step("Check all country options are present", async () => {
        const countrySelect = page.locator(
          `select[name="${SELECTORS.countrySelect}"]`
        );

        // Get all options
        const options = await countrySelect.locator("option").allTextContents();

        // Verify expected countries are in the dropdown
        expect(options).toContain("Brazil");
        expect(options).toContain("Canada");
        expect(options).toContain("United States of America");
        expect(options).toContain("Mexico");
        expect(options).toContain("Portugal");
      });
    });
  });
});
