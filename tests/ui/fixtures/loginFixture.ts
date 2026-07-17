import { test as base } from '@playwright/test';
import { getTestData } from '../../utils/testDataLoader';
import { POMManager } from '../POMManager';

interface TestData {
  url: string;
  username: string;
  password: string;
  validUsername: string;
  validPassword: string;
  invalidUsername: string;
  invalidPassword: string;
  mandatoryFieldError:string;
  invalidCredentialsError:string;
}

interface LoginFixtures {
  testData: TestData;
  pomManager: POMManager;
}

export const test = base.extend<LoginFixtures>({
  // Fixture for test data
  testData: async ({}, use) => {
    const data = getTestData();
    await use(data);
  },

  // Fixture for POMManager - manages all page objects
  pomManager: async ({ page, testData }, use) => {
    await page.goto(testData.url, { waitUntil: 'domcontentloaded' });
    const pomManager = new POMManager(page);
    await use(pomManager);
  },
});

export { expect } from '@playwright/test';
