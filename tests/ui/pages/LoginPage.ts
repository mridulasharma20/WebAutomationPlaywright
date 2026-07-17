import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // ==================== Login Form Fields ====================
  private readonly usernameFieldLocator: Locator;
  private readonly passwordFieldLocator: Locator;
  private readonly loginButtonLocator: Locator;

  // ==================== Error Messages ====================
  private readonly errorMessagesLocator: Locator;
  private readonly firstErrorMessageLocator: Locator;
  private readonly lastErrorMessageLocator: Locator;

  // ==================== Dashboard/Success Elements ====================
  private readonly dashboardElementLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Login Form Fields
    this.usernameFieldLocator = this.page.locator('input[name="username"]');
    this.passwordFieldLocator = this.page.locator('input[name="password"]');
    //this.loginButtonLocator = this.page.locator('button:has-text("Login")');
   this.loginButtonLocator = this.page.getByRole('button', { name: 'Login' });
   

    // Initialize Error Messages
    this.errorMessagesLocator = this.page.locator('span[class*="error-message"]');
    this.firstErrorMessageLocator = this.page.locator('span[class*="error-message"]').first();
    this.lastErrorMessageLocator = this.page.locator('span[class*="error-message"]').last();

    // Initialize Dashboard/Success Elements
    this.dashboardElementLocator = this.page.locator('[class*="dashboard"]');
  }

  // ==================== Getter Methods ====================

  /**
   * Username input field
   */
  get usernameField(): Locator {
    return this.usernameFieldLocator;
  }

  /**
   * Password input field
   */
  get passwordField(): Locator {
    return this.passwordFieldLocator;
  }

  /**
   * Login button
   */
  get loginButton(): Locator {
    return this.loginButtonLocator;
  }

  /**
   * All error messages
   */
  get errorMessages(): Locator {
    return this.errorMessagesLocator;
  }

  /**
   * First error message
   */
  get firstErrorMessage(): Locator {
    return this.firstErrorMessageLocator;
  }

  /**
   * Last error message
   */
  get lastErrorMessage(): Locator {
    return this.lastErrorMessageLocator;
  }

  /**
   * Dashboard element (indicates successful login)
   */
  get dashboardElement(): Locator {
    return this.dashboardElementLocator;
  }
}
