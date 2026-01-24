
import { AppConfig } from '../../models/config/app-config.model';
import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FeatureFlag } from '../../models/config/feature-flag.model';


@Injectable({ providedIn: 'root' })
export class ConfigService {

  

  get apiBaseUrl(): string {
    return environment.apiBaseUrl;
  }
  private _featureFlags = signal<FeatureFlag>(environment.featureFlags);

  readonly featureFlags = computed(() => this._featureFlags());

  /** Check if a feature is enabled */
  isFeatureEnabled(flag: keyof FeatureFlag): boolean {
    return !!this._featureFlags()[flag];
  }
}
