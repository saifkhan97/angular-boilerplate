import { Injectable, signal, computed } from '@angular/core';
import { TokenService } from './token.service';

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly _user = signal<AuthUser | null>(null);

  /** Public readonly signals */
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  constructor(private tokenService: TokenService) {
    this.restoreSession();
  }

  /** Called after successful login */
  login(accessToken: string, refreshToken: string): void {
    this.tokenService.setTokens(accessToken, refreshToken);
    this.setUserFromToken(accessToken);
  }

  logout(): void {
    this.tokenService.clearTokens();
    this._user.set(null);
  }

  hasRole(role: string): boolean {
    return this._user()?.roles.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(r => this.hasRole(r));
  }

  hasPermission(permission: string): boolean {
    return this._user()?.permissions.includes(permission) ?? false;
  }

  private restoreSession(): void {
    const token = this.tokenService.getAccessToken();
    if (token) {
      this.setUserFromToken(token);
    }
  }

  private setUserFromToken(token: string): void {
    const payload = this.tokenService.decodeToken<AuthUser>(token);
    if (payload) {
      this._user.set(payload);
    }
  }
}
