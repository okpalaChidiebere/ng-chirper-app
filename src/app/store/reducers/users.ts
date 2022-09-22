import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import { UsersActions } from '../actions/users';
import { User } from '../../utils/_DATA';

export const USERS_FEATURE_KEY = 'users';
export const getUsersState = createFeatureSelector(USERS_FEATURE_KEY);
export type UsersState = Record<string, User>;
export const initialState: UsersState = {};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.receiveUsers, (state, action) => ({
    ...state,
    ...action.users,
  }))
);
