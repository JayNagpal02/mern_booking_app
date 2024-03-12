import { test, expect } from "@playwright/test";
import path from "path";

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

// Test to add a new hotel
test("should allow user to add a hotel", async ({ page }) => {
    // Navigate to the add-hotel page
    await page.goto(`${UI_URL}add-hotel`);

    // Fill in the hotel details
    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page
        .locator("[name=description]")
        .fill("This is a description for the Test Hotel");
    await page.locator("[name=pricePerNight]").fill("100");

    // Select star rating
    await page.selectOption('select[name="starRating"]', "3");

    // Select hotel type
    await page.getByText("Budget").click();

    // Select facilities
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Spa").check();

    // Fill in guest counts
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("1");

    // Upload images
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "testImg1.png"),
        path.join(__dirname, "files", "testImg2.png"),
    ]);

    // Click the save button
    await page.getByRole("button", { name: "Save" }).click();

    // Verify if the success message is visible
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

// Test to display hotels
test("should display hotels", async ({ page }) => {
    // Navigate to the my-hotels page
    await page.goto(`${UI_URL}my-hotels`);

    // Verify if hotel details are visible
    await expect(page.getByText("Horse Land")).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
    await expect(
        page.getByText("Horseland Hotel and Mountain Spa is one of the most")
    ).toBeVisible();
    await expect(page.getByText("Matheran, India")).toBeVisible();
    await expect(page.getByText("Family")).toBeVisible();
    await expect(page.getByText("₹100 per night").first()).toBeVisible();
    await expect(page.getByText("4 adults, 4 children")).toBeVisible();
    await expect(page.getByText("4 Star Rating")).toBeVisible();
    await expect(
        page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
    // Navigate to the page displaying user's hotels
    await page.goto(`${UI_URL}my-hotels`);

    // Click on the "View Details" link of the first hotel
    await page.getByRole("link", { name: "View Details" }).first().click();

    // Wait for the name input field to be attached
    await page.waitForSelector('[name="name"]', { state: "attached" });

    // Verify that the name input field initially contains "Horse Land"
    await expect(page.locator('[name="name"]')).toHaveValue("Horse Land");

    // Modify the value of the name input field to "Horse Land Updated"
    await page.locator('[name="name"]').fill("Horse Land Updated");

    // Click on the "Save" button to update the hotel
    await page.getByRole("button", { name: "Save" }).click();

    // Verify that the success message "Hotel Updated!" is visible after saving
    await expect(page.getByText("Hotel Updated!")).toBeVisible();

    // Reload the page
    await page.reload();

    // Verify that the name input field now contains "Horse Land Updated" after reloading
    await expect(page.locator('[name="name"]')).toHaveValue(
        "Horse Land Updated"
    );

    // Revert the name back to "Horse Land"
    await page.locator('[name="name"]').fill("Horse Land");

    // Click on the "Save" button again to update the hotel with the original name
    await page.getByRole("button", { name: "Save" }).click();

    // Verify that the success message "Hotel Updated!" is visible after saving with the original name
    await expect(page.getByText("Hotel Updated!")).toBeVisible();
});
