import { test, expect } from '../fixtures/loginFixture';

test.describe('Login Functionality', () => {

  test.beforeEach(async ({ pomManager }) => {
    await pomManager.loginSteps.verifyLoginPageLoaded();
  });

  test('Empty Credentials', async ({ testData, pomManager }) => {

    // await test.step('Given: User is on the login page (via loginPage fixture)', async () => {
    //    await expect(loginPage).toHaveURL(/login/);
    // });

    await test.step('When: User clicks the login button without entering any credentials', async () => {
      await pomManager.loginSteps.clickLoginButton();
    });

    await test.step('Then: Validation error messages should be displayed for both fields', async () => {
      await pomManager.loginSteps.verifyErrorMessageCount(2);
      await pomManager.loginSteps.verifyFirstErrorMessageContains(testData.mandatoryFieldError);
      await pomManager.loginSteps.verifyLastErrorMessageContains(testData.mandatoryFieldError);
    });

  });

  test('Empty Password Field', async ({ testData, pomManager }) => {

    await test.step('When: User enters username but leaves password empty', async () => {
      await pomManager.loginSteps.enterUsername(testData.validUsername);
      await pomManager.loginSteps.clickLoginButton();
    });

    await test.step('Then: A validation error message should be displayed', async () => {
      await pomManager.loginSteps.verifyErrorMessageContains(testData.mandatoryFieldError);
    });

  });

  test('Empty Username Field', async ({ testData, pomManager }) => {

    await test.step('When: User leaves username empty but enters password', async () => {
      await pomManager.loginSteps.enterPassword(testData.validPassword);
      await pomManager.loginSteps.clickLoginButton();
    });

    await test.step('Then: A validation error message should be displayed', async () => {
      await pomManager.loginSteps.verifyErrorMessageContains(testData.mandatoryFieldError);
    });

  });

  test('Invalid Password', async ({ testData, pomManager }) => {

    await test.step('When: User enters valid username with invalid password', async () => {
      await pomManager.loginSteps.login(testData.validUsername, testData.invalidPassword);
    });

    await test.step('Then: An error message should be displayed for invalid credentials', async () => {
      await pomManager.loginSteps.verifyInvalidCredentialsMessage(testData.invalidCredentialsError);
    });

  });

  test('Invalid Username', async ({ testData, pomManager }) => {

    await test.step('When: User enters invalid username with valid password', async () => {
      await pomManager.loginSteps.login(testData.invalidUsername, testData.validPassword);
    });

    await test.step('Then: An error message should be displayed for invalid credentials', async () => {
      await pomManager.loginSteps.verifyInvalidCredentialsMessage(testData.invalidCredentialsError);
    });

  });

  test('Valid Login', async ({ testData, pomManager }) => {

    await test.step('When: User enters valid credentials', async () => {
      await pomManager.loginSteps.login(testData.validUsername, testData.validPassword);
    });

    await test.step('Then: User should be redirected to the dashboard', async () => {
      await pomManager.loginSteps.verifyDashboardPageLoaded();
    });

  });

});