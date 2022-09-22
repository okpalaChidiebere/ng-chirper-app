import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedEffects } from './actions/shared';
import {
  authedUser,
  AuthedUserState,
  AUTHED_USER_FEATURE_KEY,
} from './reducers/authedUser';
import {
  tweetsReducer,
  TweetsState,
  TWEETS_FEATURE_KEY,
} from './reducers/tweets';
import { usersReducer, UsersState, USERS_FEATURE_KEY } from './reducers/users';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),
    StoreModule.forFeature(TWEETS_FEATURE_KEY, tweetsReducer),
    StoreModule.forFeature(AUTHED_USER_FEATURE_KEY, authedUser),
    EffectsModule.forRoot([SharedEffects]),
  ],
})
export class AppStore {}
export interface AppState {
  [USERS_FEATURE_KEY]: UsersState;
  [TWEETS_FEATURE_KEY]: TweetsState;
  [AUTHED_USER_FEATURE_KEY]: AuthedUserState;
}
