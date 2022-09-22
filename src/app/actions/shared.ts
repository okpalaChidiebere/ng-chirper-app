import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { catchError, forkJoin, of, switchMap } from 'rxjs';

import { TweetsService } from '../services/tweets.service';
import { UsersService } from '../services/users.service';
import { setAuthedUser } from './authedUser';
import { TweetsActions } from './tweets';
import { UsersActions } from './users';

export const AUTHED_ID = 'tylermcginnis'; //we just hard coded this to avoid worrying about authentication :)

export const handleInitialData = createAction('[Shared] Init');

@Injectable()
export class SharedEffects {
  public readonly handleInitialData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(handleInitialData), // we specify that we want this effect to run when the initData action is dispatched
      switchMap((payload) =>
        forkJoin([this.tweetsService.getTweets(), this.usersService.getUsers()])
      ),
      switchMap((data) => {
        const [tweets, users] = data;
        return [
          UsersActions.receiveUsers(users),
          TweetsActions.receiveTweets(tweets),
          setAuthedUser({ id: AUTHED_ID }),
        ];
      }),
      catchError((error: string | null) => of())
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly tweetsService: TweetsService,
    private readonly usersService: UsersService
  ) {}
}
