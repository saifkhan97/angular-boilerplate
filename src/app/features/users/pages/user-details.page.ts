import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UserApi } from '../services/users.api';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <pre>{{ user$ | async | json }}</pre>
  `
})
export class UserDetailsPage {
  private route = inject(ActivatedRoute);
  private api = inject(UserApi);

  user$ = this.route.paramMap.pipe(
    switchMap(p => this.api.getUser(p.get('id')!))
  );
}
