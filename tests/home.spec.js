import { test, expect } from "@playwright/test";
import { HOMEPAGE, NAVIGATION } from "./data/home.js";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await test.step("Verify page title", async () => {
      await expect(page).toHaveTitle(HOMEPAGE.title);
    });
  });

  test("check homepage texts", async ({ page }) => {
    await test.step("Verify main heading is visible", async () => {
      await expect(
        page.getByRole("heading", { name: HOMEPAGE.heading })
      ).toBeVisible();
    });

    await test.step("Verify description text is visible", async () => {
      await expect(page.getByText(HOMEPAGE.description)).toBeVisible();
    });
  });

  test("navigate to the login page", async ({ page }) => {
    await test.step("Click on Login link", async () => {
      await page.getByRole("link", { name: NAVIGATION.loginLink }).click();
    });

    await test.step("Verify redirected to login page", async () => {
      await expect(
        page.getByRole("heading", { name: NAVIGATION.loginHeading })
      ).toBeVisible();
    });
  });
});
