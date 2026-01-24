import { Injectable } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  production: boolean;
  features?: Record<string, boolean>;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {

  private readonly config: AppConfig = {
    apiBaseUrl: 'https://api.example.com',
    production: false,
    features: {
      enableAuditLogs: true,
      enableReports: false
    }
  };

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  isProduction(): boolean {
    return this.config.production;
  }

  isFeatureEnabled(feature: string): boolean {
    return !!this.config.features?.[feature];
  }
}
