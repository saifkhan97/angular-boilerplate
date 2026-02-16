// environments/environment.ts
import { FeatureFlag } from '../app/models/config/feature-flag.model';

export const environment = {
  production: false,
  apiBaseUrl: 'https://dummyjson.com/',
  defaultLanguage: 'en',
  featureFlags: <FeatureFlag>{
    userManagement: true,
    billing: false,
    multiLanguage: true
  }
};
