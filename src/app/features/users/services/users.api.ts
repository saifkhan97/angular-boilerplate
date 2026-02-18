import { inject, Injectable } from '@angular/core';

import { shareReplay } from 'rxjs';
import { User } from '../../../models/user/user.model';
import { ApiService } from '../../../core/services/api.service';
export interface UsersApiResponse {
  limit: number;
  page: number;
  total: number;
  totalPages:number;
  users: User[];
}
@Injectable({ providedIn: 'root' })

export class UserApi {
  private http = inject(ApiService);
  private baseUrl = '/users';

  getUsers() {
    return this.http
      .get<UsersApiResponse>(this.baseUrl)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(payload: User) {
    return this.http.post<User>(this.baseUrl, payload);
  }
}
