import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { retry, throwError } from 'rxjs';

const MAX_RETRIES = 2;

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error: HttpErrorResponse) => {
        // Retry only for network / server errors
        if (error.status === 0 || error.status >= 500) {
          return throwError(() => error);
        }
        return throwError(() => error);
      }
    })
  );
};
