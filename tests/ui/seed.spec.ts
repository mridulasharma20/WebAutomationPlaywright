import { test, expect } from '@playwright/test';

test.describe('Orange HRM Login Setup', () => {
  test.skip('setup - navigate to login page', async ({ page }) => {
    // Navigate to Orange HRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // Verify login page is loaded
    await expect(page).toHaveTitle(/login/i);
  });
});
