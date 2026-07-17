import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class LoginSteps {
  private readonly page: Page;
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'load' });
  }

  /**
   * Enter username in the username field
   */
  async enterUsername(username: string): Promise<void> {
    await this.loginPage.usernameField.fill(username);
  }

  /**
   * Enter password in the password field
   */
  async enterPassword(password: string): Promise<void> {
    await this.loginPage.passwordField.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginPage.loginButton.click();
  }

  /**
   * Clear the username field
   */
  async clearUsernameField(): Promise<void> {
    await this.loginPage.usernameField.clear();
  }

  /**
   * Clear the password field
   */
  async clearPasswordField(): Promise<void> {
    await this.loginPage.passwordField.clear();
  }

  /**
   * Verify error message count
   */
  async verifyErrorMessageCount(expectedCount: number): Promise<void> {
    await expect(this.loginPage.errorMessages).toHaveCount(expectedCount);
  }

  /**
   * Verify error message contains text
   */
  async verifyErrorMessageContains(text: string): Promise<void> {
    await expect(this.loginPage.errorMessages).toContainText(text);
  }

  /**
   * Verify first error message contains text
   */
  async verifyFirstErrorMessageContains(text: string): Promise<void> {
    await expect(this.loginPage.firstErrorMessage).toContainText(text);
  }

  /**
   * Verify last error message contains text
   */
  async verifyLastErrorMessageContains(text: string): Promise<void> {
    await expect(this.loginPage.lastErrorMessage).toContainText(text);
  }

  /**
   * Verify login was successful
   */
  async verifyLoginSuccess(): Promise<void> {
    // Adjust selector based on your application's success indicator
    await expect(this.loginPage.dashboardElement).toBeVisible();
  }

  /**
   * Verify page title
   */
  async verifyPageTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(title));
  }

  /**
   * Verify the login page is loaded
   */
  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
  }

  /**
   * Verify the dashboard page is loaded after successful login
   */
  async verifyDashboardPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  /**
   * Verify invalid credentials message is displayed
   */
  async verifyInvalidCredentialsMessage(text: string): Promise<void> {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

