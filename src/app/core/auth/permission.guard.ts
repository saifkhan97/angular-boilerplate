import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredPermissions =
    route.data['permissions'] as string[] | undefined;

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  const hasPermission = requiredPermissions.every(p =>
    auth.hasPermission(p)
  );

  if (!hasPermission) {
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
};
