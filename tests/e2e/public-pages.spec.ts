import { test, expect } from "@playwright/test";

test.describe("Public Site & SEO Routing", () => {
  test("Homepage renders with hero, key CTA, and structured SEO elements", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Resume Maker/);

    // Verify Hero CTA buttons exist
    const cta = page.getByRole("link", { name: /Build My Resume Free/i }).first();
    await expect(cta).toBeVisible();

    // Verify navigation links
    await expect(page.getByRole("link", { name: "Templates" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Pricing" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "FAQ" }).first()).toBeVisible();
  });

  test("Template gallery displays templates and allows filtering", async ({ page }) => {
    await page.goto("/templates");
    await expect(page.getByText("Explore Recruiter-Approved Templates")).toBeVisible();

    // Verify filter tabs
    await expect(page.getByRole("button", { name: "All Templates" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Modern" })).toBeVisible();
    await expect(page.getByRole("button", { name: "ATS Clean" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Academic CV" })).toBeVisible();

    // Filter by Academic CV
    await page.getByRole("button", { name: "Academic CV" }).click();
    await expect(page.getByText("Academic & Scientific CV")).toBeVisible();
  });

  test("Programmatic SEO landing page renders correctly", async ({ page }) => {
    await page.goto("/resume-template/software-engineer");
    await expect(page.getByText("Software Engineer Resume Template")).toBeVisible();
    await expect(page.getByText("ATS Optimized")).toBeVisible();
  });

  test("Privacy Policy and Terms pages are accessible", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.getByText("Data Portability")).toBeVisible();

    await page.goto("/terms");
    await expect(page.getByRole("heading", { name: "Terms of Service" })).toBeVisible();
  });
});

