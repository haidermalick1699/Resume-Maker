import { test, expect } from "@playwright/test";

test.describe("Authentication, Dashboard & Editor Workflow", () => {
  test("User can navigate to login and view sign-in form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("User can navigate to register page and view sign-up form", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("heading", { name: "Create Your Account" })).toBeVisible();

    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
