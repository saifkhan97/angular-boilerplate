
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { LoadingService } from '../../../core/services/loading.service';
import { AuthApi } from '../auth-api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authApiService = inject(AuthApi)
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);
  /** UI state */
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);

  /** Reactive form */
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  /** Form controls (typed & readable) */
  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  /** Submit handler */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set(null);
    this.submitting.set(true);
    this.loadingService.show();

    const { email, password } = this.form.getRawValue();
    let payload = {
      email:email,
      password:password
    }
    this.authApiService.login(payload).subscribe({
      next: (res) => {
        // 1️⃣ Set auth state (tokens + user)
        this.authService.login(res.accessToken, res.refreshToken);

        // 2️⃣ Navigate after successful auth
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.submitting.set(false);
        this.loadingService.hide();
        this.error.set(
          err?.error?.message || err?.message || 'Login failed'
        );
      },
      complete: () => {
        this.submitting.set(false);
        this.loadingService.hide();
      }
    });

  }

}
