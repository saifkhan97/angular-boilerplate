import { Routes } from '@angular/router';
import { UserListPage } from './pages/user-list.page';
import { UserCreatePage } from './pages/user-create.page';
import { UserDetailsPage } from './pages/user-details.page';


export const usersRoutes: Routes = [
  { path: '', component: UserListPage },
  { path: 'create', component: UserCreatePage },
  { path: ':id', component: UserDetailsPage }
];
