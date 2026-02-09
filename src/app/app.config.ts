import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { retryInterceptor } from './core/interceptors/retry.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Global error listeners
    provideBrowserGlobalErrorListeners(),

    // Routing
    provideRouter(routes),

    // HttpClient
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
        retryInterceptor,
        loadingInterceptor
      ])
    )
  ]
};
