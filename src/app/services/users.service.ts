import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { User } from '../utils/_DATA';
import { environment } from '../../environments/environment';

const API_HOST = `${environment.http2ApiHost}/user.v1.UserService`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .post<{ items: User[]; next_key: string }>(
        `${API_HOST}/ListUsers`,
        { limit: 0, next_key: '' },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        map((res) => res.items),
        catchError((err) => throwError(() => new Error('Opps!')))
      );
  }
}
