import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import {
  authedUser,
  AuthedUserState,
  AUTHED_USER_FEATURE_KEY,
} from './authedUser';
import { tweetsReducer, TweetsState, TWEETS_FEATURE_KEY } from './tweets';
import { usersReducer, UsersState, USERS_FEATURE_KEY } from './users';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),
    StoreModule.forFeature(TWEETS_FEATURE_KEY, tweetsReducer),
    StoreModule.forFeature(AUTHED_USER_FEATURE_KEY, authedUser),
  ],
})
export class CombineReducers {}
export interface AppState {
  [USERS_FEATURE_KEY]: UsersState;
  [TWEETS_FEATURE_KEY]: TweetsState;
  [AUTHED_USER_FEATURE_KEY]: AuthedUserState;
}
