import { test } from "@playwright/test";
import { HomePage } from "./pages/HomePage.js";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test("has title", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Verify page title", async () => {
      await homePage.verifyTitle();
    });
  });

  test("check homepage texts", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Verify main heading is visible", async () => {
      await homePage.verifyMainHeading();
    });

    await test.step("Verify description text is visible", async () => {
      await homePage.verifyDescription();
    });
  });

  test("navigate to the login page", async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step("Click on Login link", async () => {
      await homePage.clickLoginLink();
    });

    await test.step("Verify redirected to login page", async () => {
      await homePage.verifyLoginPageRedirect();
    });
  });
});
