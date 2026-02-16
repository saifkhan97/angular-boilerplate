import { signal } from '@angular/core';
import { User } from '../../../models/user/user.model';


export const usersStore = {
  users: signal<User[]>([]),
  loading: signal(false)
};
