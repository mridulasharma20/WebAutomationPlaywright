import path from 'path';
import fs from 'fs';

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

export function getTestData(): TestData {
  // Get environment from command line or default to 'qa'
  const env = process.env.ENV || 'qa';
  
  const dataPath = path.join(process.cwd(), 'tests', 'ui', 'test-data', `${env}.json`);
  
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Test data file not found: ${dataPath}`);
  }
  
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const rawData = JSON.parse(fileContent);
  
  // Map the data to match TestData interface
  return {
    url: rawData.url,
    username: rawData.username,
    password: rawData.password,
    validUsername: rawData.username,
    validPassword: rawData.password,
    invalidUsername: rawData.invalidUsername,
    invalidPassword: rawData.invalidPassword,
    mandatoryFieldError:rawData.mandatoryFieldError,
    invalidCredentialsError:rawData.invalidCredentialsError
  } as TestData;
}