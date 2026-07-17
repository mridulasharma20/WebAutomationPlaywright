import { Page } from '@playwright/test';
import { LoginSteps } from './step-definations/LoginSteps';
import { PIMSteps } from './step-definations/PIMSteps';

/**
 * POMManager - Manages all Page Object Models and Step Definitions
 * Centralizes the creation of all page objects and step classes
 */
export class POMManager {
  private readonly page: Page;
  private readonly _loginSteps: LoginSteps;
  private readonly _pimSteps: PIMSteps;

  constructor(page: Page) {
    this.page = page;

    this._loginSteps = new LoginSteps(page);
    this._pimSteps = new PIMSteps(page);
  }

  /**
   * Get LoginSteps instance
   */
  get loginSteps(): LoginSteps {
    return this._loginSteps;
  }

  /**
   * Get PIMSteps instance
   */
  get pimSteps(): PIMSteps {
    return this._pimSteps;
  }
}
