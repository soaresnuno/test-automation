import { test, expect } from "@playwright/test";

const BASE_URL = "https://playground-drab-six.vercel.app";
const CREDENTIALS = {
  valid: { username: "test", password: "password123" },
  blocked: { username: "testblock", password: "password123" },
};

async function navigateToLogin(page) {
  await page.goto(`${BASE_URL}/login`);
}

async function performLogin(page, username, password) {
  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill(username);
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

test.describe("Homepage", () => {
  test("has title", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Playground page/);
  });

  test("check homepage texts", async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(
      page.getByRole("heading", { name: "Test Playground" })
    ).toBeVisible();

    await expect(
      page.getByText(
        "This page was developed by the Bug Buster Mentorship team for educational purposes."
      )
    ).toBeVisible();
  });

  test("navigate to the login page", async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole("link", { name: "Login" }).click();

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});

test.describe("Authentication", () => {
  test("login with regular account", async ({ page }) => {
    await navigateToLogin(page);

    await performLogin(
      page,
      CREDENTIALS.valid.username,
      CREDENTIALS.valid.password
    );

    await expect(page.getByText("User test authenticated")).toBeVisible();
  });

  test("login with blocked account should display error message", async ({
    page,
  }) => {
    await navigateToLogin(page);

    await performLogin(
      page,
      CREDENTIALS.blocked.username,
      CREDENTIALS.blocked.password
    );

    await expect(page.getByText("User blocked!")).toBeVisible();
  });

  test("test logout", async ({ page }) => {
    await navigateToLogin(page);

    await performLogin(
      page,
      CREDENTIALS.valid.username,
      CREDENTIALS.valid.password
    );

    await expect(page.getByText("User test authenticated")).toBeVisible();

    await page.getByRole("button", { name: "Logout" }).click();

    await expect(
      page.getByText("You have been logged out. Please log in.")
    ).toBeVisible();
  });

  test("login with invalid username should display error message", async ({
    page,
  }) => {
    await navigateToLogin(page);

    await performLogin(page, "invaliduser", CREDENTIALS.valid.password);

    await expect(page.getByText("User not found!")).toBeVisible();
  });

  test("login with invalid password should display error message", async ({
    page,
  }) => {
    await navigateToLogin(page);

    await performLogin(page, CREDENTIALS.valid.username, "wrongpassword");

    await expect(
      page.getByText("Incorrect username or password!")
    ).toBeVisible();
  });
});
