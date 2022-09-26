import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { createAction, Store } from '@ngrx/store';
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs';

import { TweetsService } from '../../services/tweets.service';
import { UsersService } from '../../services/users.service';
import { AppState } from '../reducers';
import { setAuthedUser } from './authedUser';
import { LoadingBarActions } from './loadingbar';
import { TweetsActions } from './tweets';
import { UsersActions } from './users';

export const AUTHED_ID = 'tylermcginnis'; //we just hard coded this to avoid worrying about authentication :)

export const handleInitialData = createAction('[Shared] Init');

@Injectable()
export class SharedEffects implements OnInitEffects {
  public readonly handleInitialData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(handleInitialData), // we specify that we want this effect to run when the initData action is dispatched
      tap(() => this.store.dispatch(LoadingBarActions.showLoading())),
      switchMap((payload) =>
        forkJoin([this.tweetsService.getTweets(), this.usersService.getUsers()])
      ),
      switchMap((data) => {
        const [tweets, users] = data;
        return [
          UsersActions.receiveUsers(users),
          TweetsActions.receiveTweets(tweets),
          setAuthedUser({ id: AUTHED_ID }),
          LoadingBarActions.hideLoading(),
        ];
      }),
      catchError((error: string | null) => of())
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly tweetsService: TweetsService,
    private readonly usersService: UsersService,
    private readonly store: Store<AppState>
  ) {}

  ngrxOnInitEffects() {
    return handleInitialData();
  }
}
