import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { createActionGroup, props, Store } from '@ngrx/store';
import { catchError, forkJoin, from, map, of, switchMap, tap } from 'rxjs';

import { saveLikeToggle } from 'src/app/utils/api';
import { FormatedTweet } from 'src/app/utils/helpers';
import { Tweet, _getTweets } from '../../utils/_DATA';
import { AppState } from '../reducers';

export const TweetsActions = createActionGroup({
  source: 'Tweets',
  events: {
    'Receive Tweets ': (tweets: Record<string, Tweet>) => ({ tweets }),
    'Toggle Tweet': props<
      Pick<FormatedTweet, 'hasLiked' | 'id'> & { authedUser: string }
    >(),
    'Handle Toggle Tweet': props<Pick<FormatedTweet, 'hasLiked' | 'id'>>(),
  },
});

@Injectable()
export class TweetsEffects {
  public readonly handleToggleTweet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TweetsActions.handleToggleTweet),
        concatLatestFrom(() => this.store.select((state) => state.authedUser)), //similar to getState() params for a thunk method in Redux
        map((data) => {
          const [me, authedUser] = data;
          return { info: { authedUser, hasLiked: me.hasLiked, id: me.id } };
        }),
        tap((action) =>
          this.store.dispatch(TweetsActions.toggleTweet(action.info))
        ),
        switchMap((action) => {
          return forkJoin([
            of(action.info),
            from(saveLikeToggle(action.info)),
          ]).pipe(
            map((data) => of()),
            catchError((error) => {
              console.warn('Error in handleToggleTweet: ', error);
              this.store.dispatch(TweetsActions.toggleTweet(action.info)); //reset the tweet to back it was initially
              alert('The was an error liking the tweet. Try again.');
              return of();
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    protected readonly actions$: Actions,
    private readonly store: Store<AppState>
  ) {}
}
