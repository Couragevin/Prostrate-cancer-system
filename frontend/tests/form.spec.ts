import { test, expect, type Page } from '@playwright/test';

const PREDICT_ROUTE = '**/api/v1/predict/**';

const MOCK_RESULT = {
  model_type: 'xgboost',
  xgboost_probability: 0.4999,
  risk_category: 'Intermediate',
  shap_summary: 'Mocked prediction narrative for the assessed patient.',
  shap_values: {
    age_band: 0.003,
    psa_level: 1.365,
    psa_density: 0.932,
    family_history: 1.207,
    bmi_category: 0.0,
    hypertension: 0.0,
    diabetes: 0.0,
    dre_finding: 0.759,
  },
  class_probabilities: { Low: 0.0004, Intermediate: 0.9994, High: 0.0002 },
  shap_basis: 'xgboost',
};

/** Walks the wizard up to the Run Prediction button without clicking it. */
async function fillWizard(page: Page) {
  await page.goto('/assessment');

  await expect(page.getByRole('heading', { name: 'Patient Information' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Medical History' })).toBeVisible();
  await page.getByText('Direct Family History').click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Laboratory Results' })).toBeVisible();
  await page.getByLabel('Total Serum PSA (ng/mL)').fill('5.2');
  await page.getByLabel('PSA Density').fill('0.15');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Normal (Smooth, non-tender)' }).click();
}

test.describe('Assessment wizard', () => {
  test('renders results after a successful prediction', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Run Prediction' }).click();

    await expect(page.getByRole('heading', { name: 'Analysis Complete' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Mocked prediction narrative for the assessed patient.')).toBeVisible();

    // Category comes from the backend, not a client-side threshold.
    await expect(page.getByText('Intermediate Risk Profile')).toBeVisible();
    await expect(page.getByText('50.0%')).toBeVisible();

    // Explainability panel rendered from the SHAP payload.
    await expect(page.getByText('AI Explainability (SHAP)')).toBeVisible();
    await expect(page.getByRole('button', { name: /Print Report/ })).toBeVisible();
  });

  test('sends every collected field, including comorbidities', async ({ page }) => {
    let body: Record<string, unknown> | undefined;
    await page.route(PREDICT_ROUTE, async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: MOCK_RESULT });
    });

    await page.goto('/assessment');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByText('Direct Family History').click();
    await page.getByText('Hypertension').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Total Serum PSA (ng/mL)').fill('9.1');
    await page.getByLabel('PSA Density').fill('0.22');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Abnormal (Hard nodules)' }).click();
    await page.getByRole('button', { name: 'Run Prediction' }).click();

    await expect(page.getByRole('heading', { name: 'Analysis Complete' })).toBeVisible({ timeout: 15000 });

    expect(body).toMatchObject({
      age_band: '50-59',
      bmi_category: 'Normal',
      psa_level: 9.1,
      psa_density: 0.22,
      family_history: true,
      hypertension: true,
      diabetes: false,
      dre_finding: 'Abnormal',
    });
  });

  test('stays on the results step and offers retry when the API fails', async ({ page }) => {
    // Regression test: a failed request used to send the user back to the
    // Laboratory Results form, which read as "the submit button did nothing".
    await page.route(PREDICT_ROUTE, (route) => route.abort('failed'));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Run Prediction' }).click();

    const errorPanel = page.getByTestId('prediction-error');
    await expect(errorPanel).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Analysis Could Not Complete')).toBeVisible();

    // Must NOT have fallen back to the input form.
    await expect(page.getByRole('heading', { name: 'Laboratory Results' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Run Prediction' })).toBeHidden();

    await expect(page.getByRole('button', { name: /Retry Analysis/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Edit Inputs/ })).toBeVisible();
  });

  test('retry succeeds without re-entering data', async ({ page }) => {
    let attempts = 0;
    await page.route(PREDICT_ROUTE, async (route) => {
      attempts += 1;
      if (attempts === 1) return route.abort('failed');
      await route.fulfill({ json: MOCK_RESULT });
    });

    await fillWizard(page);
    await page.getByRole('button', { name: 'Run Prediction' }).click();

    await expect(page.getByTestId('prediction-error')).toBeVisible({ timeout: 15000 });
    await page.getByRole('button', { name: /Retry Analysis/ }).click();

    await expect(page.getByRole('heading', { name: 'Analysis Complete' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Mocked prediction narrative for the assessed patient.')).toBeVisible();
    expect(attempts).toBe(2);
  });

  test('surfaces the backend detail message on a 503', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) =>
      route.fulfill({ status: 503, json: { detail: 'Risk model is unavailable: artifacts missing' } })
    );

    await fillWizard(page);
    await page.getByRole('button', { name: 'Run Prediction' }).click();

    await expect(page.getByTestId('prediction-error')).toBeVisible({ timeout: 15000 });
    await expect(
      page.getByTestId('prediction-error').getByText(/Risk model is unavailable/)
    ).toBeVisible();
  });

  test('warns instead of silently ignoring an invalid submission', async ({ page }) => {
    await page.goto('/assessment');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Laboratory Results' })).toBeVisible();

    // PSA above the accepted range, and DRE never selected.
    await page.getByLabel('Total Serum PSA (ng/mL)').fill('2000');
    await page.getByRole('button', { name: 'Run Prediction' }).click();

    await expect(
      page.getByText('Please fix the validation errors before proceeding.')
    ).toBeVisible();
    await expect(
      page.getByText('PSA level is unusually high, please verify (max 1000)')
    ).toBeVisible();

    // Stays put; no navigation to the results step.
    await expect(page.getByRole('heading', { name: 'Laboratory Results' })).toBeVisible();
  });

  test('New Assessment returns to a clean step 1', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Run Prediction' }).click();
    await expect(page.getByRole('heading', { name: 'Analysis Complete' })).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: 'New Assessment' }).click();
    await expect(page.getByRole('heading', { name: 'Patient Information' })).toBeVisible();
    await expect(page.getByText('Step 1 of 3')).toBeVisible();
  });

  test('print layout drops app chrome and keeps the report', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Run Prediction' }).click();
    await expect(page.getByRole('heading', { name: 'Analysis Complete' })).toBeVisible({ timeout: 15000 });

    await page.emulateMedia({ media: 'print' });

    // Report content survives.
    await expect(page.getByText('Prostate Cancer Risk Stratification Report')).toBeVisible();
    await expect(page.getByText('Mocked prediction narrative for the assessed patient.')).toBeVisible();
    await expect(page.getByText(/Decision support only/)).toBeVisible();

    // App chrome does not.
    await expect(page.getByRole('button', { name: /Print Report/ })).toBeHidden();
    await expect(page.getByRole('button', { name: 'New Assessment' })).toBeHidden();
    await expect(page.locator('aside')).toBeHidden();
  });
});
