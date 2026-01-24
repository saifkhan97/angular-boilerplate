// environments/environment.prod.ts

import { FeatureFlag } from "../app/models/config/feature-flag.model";


export const environment = {
  production: true,
  apiBaseUrl: 'https://api.example.com',
  defaultLanguage: 'en',
  featureFlags: <FeatureFlag>{
    userManagement: true,
    billing: true,
    multiLanguage: true
  }
};
