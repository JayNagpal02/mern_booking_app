import { test, expect } from "@playwright/test";

// URL of the UI application
const UI_URL = "http://localhost:5173/";

// Before each test, sign in and navigate to the add-hotel page
test.beforeEach(async ({ page }) => {
    // Navigate to the UI_URL
    await page.goto(UI_URL);

    // Click on the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    // Verify if the sign-in heading is visible
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    // Fill in the email and password fields
    await page.locator("[name=email]").fill("test@gmail.com");
    await page.locator("[name=password]").fill("password123");

    // Click on the login button
    await page.getByRole("button", { name: "Login" }).click();

    // Verify if the sign-in success message is visible
    await expect(page.getByText("Sign in Success!")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
    // Navigate to the UI_URL
    await page.goto(UI_URL);

    // Fill in the destination field and click search
    await page.getByPlaceholder("Where are you going?").fill("Matheran");
    await page.getByRole("button", { name: "Search" }).click();

    // Verify if the search results are displayed
    await expect(page.getByText("Hotels found in Matheran")).toBeVisible();
    await expect(page.getByText("Horse Land")).toBeVisible();
});
