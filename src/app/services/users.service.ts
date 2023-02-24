import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { User } from '../utils/_DATA';
import { environment } from '../../environments/environment';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<{ items: User[]; nextKey: string }>(`${API_HOST}/v0/users/`)
      .pipe(map((res) => res.items));
  }
}
