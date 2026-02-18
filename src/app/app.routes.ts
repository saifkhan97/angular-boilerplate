// app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { AdminLayout } from './core/layout/admin-layout/admin-layout';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>  import('./features/users/users.routes')
          .then(m => m.usersRoutes)
      },
      
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '' }
];
