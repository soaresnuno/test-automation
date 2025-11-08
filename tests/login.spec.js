import { test } from "@playwright/test";
import { CREDENTIALS } from "./data/login.js";
import { LoginPage } from "./pages/LoginPage.js";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Successful login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Enter valid credentials", async () => {
      await loginPage.login(CREDENTIALS.valid);
    });

    await test.step("Verify success message and redirection", async () => {
      await loginPage.verifySuccessfulLogin();
      await loginPage.verifyUserAuthenticated();
    });
  });

  test("Blocked account", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Enter blocked account credentials", async () => {
      await loginPage.login(CREDENTIALS.blocked);
    });

    await test.step("Verify blocked user message", async () => {
      await loginPage.verifyBlockedUser();
    });
  });

  test("Invalid user (User not found!)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Enter invalid username", async () => {
      await loginPage.login({
        username: CREDENTIALS.invalid.username,
        password: CREDENTIALS.valid.password,
      });
    });

    await test.step("Verify user not found message", async () => {
      await loginPage.verifyUserNotFound();
    });
  });

  test("Wrong password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Enter valid username with wrong password", async () => {
      await loginPage.login({
        username: CREDENTIALS.valid.username,
        password: CREDENTIALS.wrongPassword.password,
      });
    });

    await test.step("Verify incorrect credentials message", async () => {
      await loginPage.verifyIncorrectCredentials();
    });
  });

  test("Wrong password 3 times (temporary block)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Attempt 1: Enter wrong password", async () => {
      await loginPage.login({
        username: CREDENTIALS.valid.username,
        password: CREDENTIALS.wrongPassword.password,
      });
      await loginPage.verifyIncorrectCredentials();
    });

    await test.step("Attempt 2: Enter wrong password again", async () => {
      await loginPage.login({
        username: CREDENTIALS.valid.username,
        password: CREDENTIALS.wrongPassword.password,
      });
      await loginPage.verifyIncorrectCredentials();
    });

    await test.step("Attempt 3: Enter wrong password third time", async () => {
      await loginPage.login({
        username: CREDENTIALS.valid.username,
        password: CREDENTIALS.wrongPassword.password,
      });
    });

    await test.step("Verify temporary block message", async () => {
      await loginPage.verifyTemporaryBlock();
    });
  });

  test("Logout functionality", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step("Login with valid credentials", async () => {
      await loginPage.login(CREDENTIALS.valid);
      await loginPage.verifyUserAuthenticated();
    });

    await test.step("Click logout button", async () => {
      await loginPage.logout();
    });

    await test.step("Verify logout message", async () => {
      await loginPage.verifyLoggedOut();
    });
  });
});
