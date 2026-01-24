/**
 * Feature toggle model
 * Enables or disables features at runtime
 */
export interface FeatureFlag {
  key: string;
  enabled: boolean;
}
