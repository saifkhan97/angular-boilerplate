import { Component } from '@angular/core';

import { usersStore } from '../store/users.store';
import { loadUsersEffect } from '../store/users.effects';
import { UserList } from '../components/user-list/user-list';

@Component({
  standalone: true,
  imports: [UserList],
  template: `
    <app-user-list [users]="users()"></app-user-list>
  `
})
export class UserListPage {
  users = usersStore.users;

  constructor() {
    loadUsersEffect();
  }
}
