import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from .env file
 */
dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

export default defineConfig({
  testDir: './tests/ui/tests',

  timeout: 3000000,

  expect: {
    timeout: 10000000,
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: [
    ['html'],
    ['blob'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});






/**
 * Playwright Configuration
 */
// export default defineConfig({
//   testDir: './tests',

//   timeout: 300000,

//   expect: {
//     timeout: 10000,
//   },

//   fullyParallel: true,

//   // Fail the build on CI if test.only is committed
//   forbidOnly: !!process.env.CI,

//   // Retry failed tests on CI
//   retries: process.env.CI ? 2 : 0,

//   // Run tests sequentially on CI
//   workers: process.env.CI ? 1 : undefined,

//   // Test Reporters
//   reporter: [
//     ['html'],
//     ['json', { outputFile: 'test-results/results.json' }],
//     ['junit', { outputFile: 'test-results/junit.xml' }],
//   ],

//   // Shared settings for all projects
//   use: {
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',

//     actionTimeout: 10000,
//     navigationTimeout: 30000,

//     // baseURL: process.env.BASE_URL,
//   },

//   // Browser Projects
//   projects: [
//     {
//       name: 'chromium',
//       use: {
//         ...devices['Desktop Chrome'],
//       },
//     },
//     {
//       name: 'firefox',
//       use: {
//         ...devices['Desktop Firefox'],
//       },
//     },
//     {
//       name: 'webkit',
//       use: {
//         ...devices['Desktop Safari'],
//       },
//     },
//   ],

//   // Local development server
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });