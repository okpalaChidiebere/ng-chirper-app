import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import { setAuthedUser } from '../actions/authedUser';

export const AUTHED_USER_FEATURE_KEY = 'authedUser';
export const getAuthedUserState = createFeatureSelector(
  AUTHED_USER_FEATURE_KEY
);
export type AuthedUserState = string | null;
export const initialState: AuthedUserState = null;

export const authedUser = createReducer(
  initialState,
  on(setAuthedUser, (state, action) => action.id)
);
