import { test, expect } from "@playwright/test";
import { CREDENTIALS, MESSAGES, SELECTORS } from "./data/login.js";

async function performLogin(page, username, password) {
  await page
    .getByRole("textbox", { name: SELECTORS.usernameInput })
    .fill(username);
  await page
    .getByRole("textbox", { name: SELECTORS.passwordInput })
    .fill(password);
  await page.getByRole("button", { name: SELECTORS.loginButton }).click();
}

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("✅ Successful login", async ({ page }) => {
    await test.step("Enter valid credentials", async () => {
      await performLogin(
        page,
        CREDENTIALS.valid.username,
        CREDENTIALS.valid.password
      );
    });

    await test.step("Verify success message and redirection", async () => {
      await expect(page.getByText(MESSAGES.successfulLogin)).toBeVisible();
      await expect(page.getByText(MESSAGES.userAuthenticated)).toBeVisible();
    });
  });

  test("🚫 Blocked account", async ({ page }) => {
    await test.step("Enter blocked account credentials", async () => {
      await performLogin(
        page,
        CREDENTIALS.blocked.username,
        CREDENTIALS.blocked.password
      );
    });

    await test.step("Verify blocked user message", async () => {
      await expect(page.getByText(MESSAGES.blockedUser)).toBeVisible();
    });
  });

  test("❌ Invalid user (User not found!)", async ({ page }) => {
    await test.step("Enter invalid username", async () => {
      await performLogin(
        page,
        CREDENTIALS.invalid.username,
        CREDENTIALS.valid.password
      );
    });

    await test.step("Verify user not found message", async () => {
      await expect(page.getByText(MESSAGES.userNotFound)).toBeVisible();
    });
  });

  test("🔑 Wrong password", async ({ page }) => {
    await test.step("Enter valid username with wrong password", async () => {
      await performLogin(
        page,
        CREDENTIALS.valid.username,
        CREDENTIALS.wrongPassword.password
      );
    });

    await test.step("Verify incorrect credentials message", async () => {
      await expect(page.getByText(MESSAGES.incorrectCredentials)).toBeVisible();
    });
  });

  test("🔁 Wrong password 3 times (temporary block)", async ({ page }) => {
    await test.step("Attempt 1: Enter wrong password", async () => {
      await performLogin(
        page,
        CREDENTIALS.valid.username,
        CREDENTIALS.wrongPassword.password
      );
      await expect(page.getByText(MESSAGES.incorrectCredentials)).toBeVisible();
    });

    await test.step("Attempt 2: Enter wrong password again", async () => {
      await performLogin(
        page,
        CREDENTIALS.valid.username,
        CREDENTIALS.wrongPassword.password
      );
      await expect(page.getByText(MESSAGES.incorrectCredentials)).toBeVisible();
    });

    await test.step("Attempt 3: Enter wrong password third time", async () => {
      await performLogin(
        page,
        CREDENTIALS.valid.username,
        CREDENTIALS.wrongPassword.password
      );
    });

    await test.step("Verify temporary block message", async () => {
      await expect(page.getByText(MESSAGES.temporaryBlock)).toBeVisible();
    });
  });

  test("🔁 Logout functionality", async ({ page }) => {
    await test.step("Login with valid credentials", async () => {
      await performLogin(
        page,
        CREDENTIALS.valid.username,
        CREDENTIALS.valid.password
      );
      await expect(page.getByText(MESSAGES.userAuthenticated)).toBeVisible();
    });

    await test.step("Click logout button", async () => {
      await page.getByRole("button", { name: SELECTORS.logoutButton }).click();
    });

    await test.step("Verify logout message", async () => {
      await expect(page.getByText(MESSAGES.loggedOut)).toBeVisible();
    });
  });
});
