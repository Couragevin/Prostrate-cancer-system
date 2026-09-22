import { test, expect } from '@playwright/test';

test.describe('Theme Toggle & Light Mode Support', () => {
  test.use({ colorScheme: 'light' });

  test('respects system preference in light mode', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/\bdark\b/);

    const toggleButton = page.getByRole('button', { name: 'Toggle theme mode' }).first();
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute('title', 'Switch to Dark Mode');
  });

  test('toggles theme when button is clicked', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggleButton = page.getByRole('button', { name: 'Toggle theme mode' }).first();
    await expect(toggleButton).toBeVisible();

    // Starts light
    await expect(html).not.toHaveClass(/\bdark\b/);

    // Click toggle -> switches to dark
    await toggleButton.click();
    await expect(html).toHaveClass(/\bdark\b/);
    await expect(toggleButton).toHaveAttribute('title', 'Switch to Light Mode');

    // Click toggle -> switches back to light
    await toggleButton.click();
    await expect(html).not.toHaveClass(/\bdark\b/);
    await expect(toggleButton).toHaveAttribute('title', 'Switch to Dark Mode');
  });

  test('persists theme preference across page navigation', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const toggleButton = page.getByRole('button', { name: 'Toggle theme mode' }).first();

    // Switch to dark mode
    await toggleButton.click();
    await expect(html).toHaveClass(/\bdark\b/);

    // Navigate to assessment page
    await page.goto('/assessment');
    await expect(html).toHaveClass(/\bdark\b/);

    // On assessment page, toggle back to light
    const assessmentToggle = page.getByRole('button', { name: 'Toggle theme mode' }).first();
    await expect(assessmentToggle).toBeVisible();
    await assessmentToggle.click();
    await expect(html).not.toHaveClass(/\bdark\b/);

    // Navigate back to home
    await page.goto('/');
    await expect(html).not.toHaveClass(/\bdark\b/);
  });
});

test.describe('Theme System Dark Preference', () => {
  test.use({ colorScheme: 'dark' });

  test('respects system preference when OS is dark mode', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveClass(/\bdark\b/);

    const toggleButton = page.getByRole('button', { name: 'Toggle theme mode' }).first();
    await expect(toggleButton).toBeVisible();
    await expect(toggleButton).toHaveAttribute('title', 'Switch to Light Mode');
  });
});
