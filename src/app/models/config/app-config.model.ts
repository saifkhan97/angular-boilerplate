import { FeatureFlag } from './feature-flag.model';

/**
 * Runtime application configuration
 */
export interface AppConfig {
  apiBaseUrl: string;
  production: boolean;
  featureFlags?: FeatureFlag[];
}
