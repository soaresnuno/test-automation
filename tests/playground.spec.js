import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/");

  await expect(page).toHaveTitle(/Playground page/);
});

test("check homepage texts", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/");

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
  await page.goto("https://playground-drab-six.vercel.app/");

  await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});

test("login with regular account", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/login");

  await page.getByRole("textbox", { name: "Type your username" }).fill("test");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User test authenticated")).toBeVisible();
});

test("login with blocked account should display error message", async ({
  page,
}) => {
  await page.goto("https://playground-drab-six.vercel.app/login");

  await page
    .getByRole("textbox", { name: "Type your username" })
    .fill("testblock");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User blocked!")).toBeVisible();
});

test("test logout", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/login");

  await page.getByRole("textbox", { name: "Type your username" }).fill("test");
  await page
    .getByRole("textbox", { name: "Type your password" })
    .fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("User test authenticated")).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();

  await expect(
    page.getByText("You have been logged out. Please log in.")
  ).toBeVisible();
});
