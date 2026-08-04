import { test, expect } from '@playwright/test';

test.describe('Assessment Form', () => {
  test('should complete the prediction flow successfully', async ({ page }) => {
    // Navigating to the page where the form is. Assuming it's at /assessment or /
    await page.goto('/');

    // Check if on Step 1 (Patient Information)
    await expect(page.locator('text=Patient Information')).toBeVisible();

    // Click continue (uses default age and BMI)
    await page.getByRole('button', { name: 'Continue' }).click();

    // Check if on Step 2 (Medical History)
    await expect(page.locator('text=Medical History')).toBeVisible();

    // Select family history
    await page.locator('text=Direct Family History').click();
    await page.getByRole('button', { name: 'Continue' }).click();

    // Check if on Step 3 (Laboratory Results)
    await expect(page.locator('text=Laboratory Results')).toBeVisible();

    // Fill in PSA level
    await page.getByLabel('Total Serum PSA (ng/mL)').fill('4.5');
    
    // Fill in PSA density
    await page.getByLabel('PSA Density').fill('0.15');

    // Select DRE finding
    // Shadcn select requires clicking the trigger then an option
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Normal (Smooth, non-tender)' }).click();

    // Submit form
    // Let's mock the API response to avoid hitting the actual backend
    await page.route('**/api/v1/predict/', async route => {
      const json = {
        xgboost_probability: 0.15,
        risk_category: "Low",
        shap_summary: "Mocked prediction narrative.",
        shap_values: { age: 0.1, psa: 0.2 }
      };
      await route.fulfill({ json });
    });

    await page.getByRole('button', { name: 'Run Prediction' }).click();

    // Wait for the mock response to be processed and loading screen to disappear
    // The component has a setTimeout of 3000ms for the loader.
    await expect(page.locator('text=Analysis Complete')).toBeVisible({ timeout: 10000 });
    
    // Check for success toast
    await expect(page.locator('text=Analysis complete')).toBeVisible();

    // Check if RiskCard is rendered
    await expect(page.locator('text=Mocked prediction narrative')).toBeVisible();
  });
  
  test('should show validation error toast on invalid inputs', async ({ page }) => {
    await page.goto('/');

    // Move to step 3
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await expect(page.locator('text=Laboratory Results')).toBeVisible();

    // Fill in invalid PSA level (too high according to our new schema)
    await page.getByLabel('Total Serum PSA (ng/mL)').fill('2000');
    
    // Submit without filling other fields to trigger validation error
    await page.getByRole('button', { name: 'Run Prediction' }).click();
    
    // Check for validation error toast
    await expect(page.locator('text=Please fix the validation errors before proceeding.')).toBeVisible();
    
    // Check for specific field error
    await expect(page.locator('text=PSA level is unusually high, please verify (max 1000)')).toBeVisible();
  });
});
