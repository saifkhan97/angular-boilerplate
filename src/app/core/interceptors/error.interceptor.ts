import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const normalizedError: ApiError = {
        status: error.status,
        message:
          error.error?.message ||
          error.statusText ||
          'Unexpected error occurred',
        errors: error.error?.errors
      };

      // Auto logout on invalid session
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => normalizedError);
    })
  );
};
