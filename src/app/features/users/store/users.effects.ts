import { inject } from '@angular/core';

import { usersStore } from './users.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserApi } from '../services/users.api';

export function loadUsersEffect() {
  const api = inject(UserApi);

  usersStore.loading.set(true);

  api.getUsers()
    .pipe(takeUntilDestroyed())
    .subscribe(res => {
      usersStore.users.set(res.users);
      usersStore.loading.set(false);
    });
}
