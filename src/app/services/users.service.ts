import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { _getUsers } from '../utils/_DATA';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getUsers() {
    return from(_getUsers());
  }
}
