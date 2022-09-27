import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { createActionGroup, props, Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  finalize,
  forkJoin,
  from,
  map,
  of,
  tap,
} from 'rxjs';

import { saveLikeToggle, saveTweet } from 'src/app/utils/api';
import { FormatedTweet } from 'src/app/utils/helpers';
import { LoadingBarActions } from './loadingbar';
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
    'Add Tweet': (tweet: Tweet) => ({ tweet }),
    'Handle Add Tweet': props<{
      text: string;
      replyingTo?: string | null;
    }>(),
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
        exhaustMap((action) => {
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

  public readonly handleAddTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetsActions.handleAddTweet),
      concatLatestFrom(() => this.store.select((state) => state.authedUser)),
      tap(() => this.store.dispatch(LoadingBarActions.showLoading())),
      exhaustMap(([action, authedUser]) =>
        from(
          saveTweet({
            text: action.text,
            author: authedUser,
            replyingTo: action.replyingTo,
          })
        ).pipe(
          map((tweet) => TweetsActions.addTweet(tweet)),
          finalize(() => {
            this.store.dispatch(LoadingBarActions.hideLoading());
          })
        )
      ),
      catchError((error, source$) => {
        console.log(error);
        this.store.dispatch(LoadingBarActions.hideLoading());
        return source$;
      })
    )
  );

  constructor(
    protected readonly actions$: Actions,
    private readonly store: Store<AppState>
  ) {}
}
