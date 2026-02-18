import { Component, inject } from '@angular/core';


import { exhaustMap } from 'rxjs';
import { UserApi } from '../services/users.api';
import { UserForm } from '../components/user-form/user-form';

@Component({
  standalone: true,
  imports: [UserForm],
  template: `
    <app-user-form (save)="create($event)"></app-user-form>
  `
})
export class UserCreatePage {
  private api = inject(UserApi);

  create(payload: any) {
    this.api.createUser(payload).subscribe();
  }
}
