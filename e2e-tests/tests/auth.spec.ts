import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

/**
 * Test to ensure that the user can sign in successfully.
 */
test("should allow the user to sign in", async ({ page }) => {
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

    // Verify if the "My Bookings" link is visible
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

    // Verify if the "My Hotels" link is visible
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

    // Verify if the "Sign Out" button is visible
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

/**
 * Test to ensure that the user can register successfully.
 */
test("should allow user to register", async ({ page }) => {
    // Generate a random email address each time the test is run
    const testEmail = `test_register_${
        Math.floor(Math.random() * 90000) + 10000
    }@test.com`;

    // Navigate to the UI_URL
    await page.goto(UI_URL);

    // Click on the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    // Click on the "Create an account here" link
    await page.getByRole("link", { name: "Create an account here" }).click();

    // Verify if the registration heading is visible
    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    // Fill in the registration form fields
    await page.locator("[name=firstName]").fill("test_firstName");
    await page.locator("[name=lastName]").fill("test_lastName");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("password123");
    await page.locator("[name=confirmPassword]").fill("password123");

    // Click on the "Create Account" button
    await page.getByRole("button", { name: "Create Account" }).click();

    // Verify if the registration success message is visible
    await expect(page.getByText("Registration Success!")).toBeVisible();

    // Verify if the "My Bookings" link is visible
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

    // Verify if the "My Hotels" link is visible
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

    // Verify if the "Sign Out" button is visible
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
