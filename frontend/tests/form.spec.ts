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

/** Walks the wizard up to the Check Risk button without clicking it. */
async function fillWizard(page: Page) {
  await page.goto('/assessment');

  await expect(page.getByRole('heading', { name: 'Patient Details' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Health History' })).toBeVisible();
  await page.getByText('Close Family History').click();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { name: 'Test Results' })).toBeVisible();
  await page.getByLabel('PSA Blood Test Result (ng/mL)').fill('5.2');
  await page.getByLabel('PSA Density').fill('0.15');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Normal (smooth)' }).click();
}

test.describe('Risk check wizard', () => {
  test('renders results after a successful prediction', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();

    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Mocked prediction narrative for the assessed patient.')).toBeVisible();

    // Category comes from the backend, not a client-side threshold.
    await expect(page.getByText('Medium Risk')).toBeVisible();
    await expect(page.getByText('50.0%')).toBeVisible();

    // Explanation panel rendered from the SHAP payload.
    await expect(page.getByText('What Affected This Result')).toBeVisible();
    await expect(page.getByRole('button', { name: /Print Report/ })).toBeVisible();
  });

  test('sends every collected field, including health history', async ({ page }) => {
    let body: Record<string, unknown> | undefined;
    await page.route(PREDICT_ROUTE, async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: MOCK_RESULT });
    });

    await page.goto('/assessment');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByText('Close Family History').click();
    await page.getByText('High Blood Pressure').click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('PSA Blood Test Result (ng/mL)').fill('9.1');
    await page.getByLabel('PSA Density').fill('0.22');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Abnormal (hard lump or nodule)' }).click();
    await page.getByRole('button', { name: 'Check Risk' }).click();

    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });

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
    // Test Results form, which read as "the submit button did nothing".
    await page.route(PREDICT_ROUTE, (route) => route.abort('failed'));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();

    const errorPanel = page.getByTestId('prediction-error');
    await expect(errorPanel).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Risk Check Could Not Finish')).toBeVisible();

    // Must NOT have fallen back to the input form.
    await expect(page.getByRole('heading', { name: 'Test Results' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Check Risk' })).toBeHidden();

    await expect(page.getByRole('button', { name: /Try Again/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Edit Test Results/ })).toBeVisible();
  });

  test('retry succeeds without re-entering data', async ({ page }) => {
    let attempts = 0;
    await page.route(PREDICT_ROUTE, async (route) => {
      attempts += 1;
      if (attempts === 1) return route.abort('failed');
      await route.fulfill({ json: MOCK_RESULT });
    });

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();

    await expect(page.getByTestId('prediction-error')).toBeVisible({ timeout: 15000 });
    await page.getByRole('button', { name: /Try Again/ }).click();

    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Mocked prediction narrative for the assessed patient.')).toBeVisible();
    expect(attempts).toBe(2);
  });

  test('surfaces the backend detail message on a 503', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) =>
      route.fulfill({ status: 503, json: { detail: 'Risk model is unavailable: artifacts missing' } })
    );

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();

    await expect(page.getByTestId('prediction-error')).toBeVisible({ timeout: 15000 });
    await expect(
      page.getByTestId('prediction-error').getByText(/Risk model is unavailable/)
    ).toBeVisible();
  });

  test('risk gauge scales with its column and encodes the value', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();
    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });

    const gauge = page.locator('svg[role="img"]').first();
    await expect(gauge).toBeVisible();

    const geometry = await gauge.evaluate((svg) => {
      const paths = svg.querySelectorAll('path');
      const texts = Array.from(svg.querySelectorAll('text')).map((t) => t.textContent);
      return {
        // A viewBox is what makes the arc scale with the container rather than
        // sitting at a fixed pixel size while the card resizes around it.
        viewBox: svg.getAttribute('viewBox'),
        dashOffset: paths[1].getAttribute('stroke-dashoffset'),
        pathLength: paths[1].getAttribute('pathLength'),
        trackStroke: paths[0].getAttribute('stroke'),
        texts,
        svgWidth: svg.getBoundingClientRect().width,
        parentWidth: (svg.parentElement as HTMLElement).getBoundingClientRect().width,
      };
    });

    expect(geometry.viewBox).toBeTruthy();
    // pathLength normalisation: offset is simply 100 - percentage.
    expect(geometry.pathLength).toBe('100');
    expect(Number(geometry.dashOffset)).toBeCloseTo(100 - MOCK_RESULT.xgboost_probability * 100, 1);
    // Track must not use --color-muted, which print forces to white.
    expect(geometry.trackStroke).toBe('var(--color-border)');
    // Scale labels so the figure is not read as a probability of disease.
    expect(geometry.texts).toContain('Low');
    expect(geometry.texts).toContain('High');
    // Never wider than the column it sits in.
    expect(geometry.svgWidth).toBeLessThanOrEqual(geometry.parentWidth + 1);
  });

  test('requests a single-slash predict path', async ({ page }) => {
    // Regression test: a trailing slash on NEXT_PUBLIC_API_URL produced
    // "<host>//api/v1/predict/", which FastAPI answers with 404 "Not Found".
    // It reproduced only in the deployed build, since the value is inlined at
    // build time from whatever the hosting provider has configured.
    let requestedUrl = '';
    await page.route(PREDICT_ROUTE, async (route) => {
      requestedUrl = route.request().url();
      await route.fulfill({ json: MOCK_RESULT });
    });

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();
    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });

    expect(requestedUrl).toContain('/api/v1/predict/');
    // No doubled slash anywhere after the scheme.
    expect(requestedUrl.replace(/^https?:\/\//, '')).not.toContain('//');
  });

  test('warns instead of silently ignoring an invalid submission', async ({ page }) => {
    await page.goto('/assessment');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Test Results' })).toBeVisible();

    // PSA above the accepted range, and DRE never selected.
    await page.getByLabel('PSA Blood Test Result (ng/mL)').fill('2000');
    await page.getByRole('button', { name: 'Check Risk' }).click();

    await expect(
      page.getByText('Please check the highlighted fields before continuing.')
    ).toBeVisible();
    await expect(
      page.getByText('This PSA value is very high. Please check it (max 1000)')
    ).toBeVisible();

    // Stays put; no navigation to the results step.
    await expect(page.getByRole('heading', { name: 'Test Results' })).toBeVisible();
  });

  test('New Check returns to a clean step 1', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();
    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });

    await page.getByRole('button', { name: 'New Check' }).click();
    await expect(page.getByRole('heading', { name: 'Patient Details' })).toBeVisible();
    await expect(page.getByText('Step 1 of 3')).toBeVisible();
  });

  test('print layout drops app chrome and keeps the report', async ({ page }) => {
    await page.route(PREDICT_ROUTE, (route) => route.fulfill({ json: MOCK_RESULT }));

    await fillWizard(page);
    await page.getByRole('button', { name: 'Check Risk' }).click();
    await expect(page.getByRole('heading', { name: 'Risk Check Complete' })).toBeVisible({ timeout: 15000 });

    await page.emulateMedia({ media: 'print' });

    // Report content survives.
    await expect(page.getByText('Prostate Cancer Risk Check Report')).toBeVisible();
    await expect(page.getByText('Mocked prediction narrative for the assessed patient.')).toBeVisible();
    await expect(page.getByText(/Decision support only/)).toBeVisible();

    // App chrome does not.
    await expect(page.getByRole('button', { name: /Print Report/ })).toBeHidden();
    await expect(page.getByRole('button', { name: 'New Check' })).toBeHidden();
    await expect(page.locator('aside')).toBeHidden();
  });
});
