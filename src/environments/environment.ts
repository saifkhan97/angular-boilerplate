// environments/environment.ts
import { FeatureFlag } from '../app/models/config/feature-flag.model';

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  defaultLanguage: 'en',
  featureFlags: <FeatureFlag>{
    userManagement: true,
    billing: false,
    multiLanguage: true
  }
};
