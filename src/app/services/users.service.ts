import { Injectable } from '@angular/core';
import { _getUsers } from '../utils/_DATA';
import { catchError, from, map, Observable, throwError } from 'rxjs';

import { User } from '../utils/_DATA';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUsers(): Observable<User[]> {
    return from(_getUsers());
  }
}
