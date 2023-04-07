import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { createActionGroup, props, Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, forkJoin, map, of, tap } from 'rxjs';

import { FormatedTweet } from 'src/app/utils/helpers';
import { LoadingBarActions } from './loadingBar';
import { Tweet } from '../../utils/_DATA';
import { AppState } from '../reducers';
import { TweetsService } from 'src/app/services/tweets.service';

export const TweetsActions = createActionGroup({
  source: 'Tweets',
  events: {
    'Receive Tweets ': (tweets: Tweet[]) => ({ tweets }),
    'Toggle Tweet': props<
      Pick<FormatedTweet, 'hasLiked' | 'id'> & { authedUserID: string }
    >(),
    'Handle Toggle Tweet':
      props<Pick<FormatedTweet, 'hasLiked' | 'id' | 'author'>>(),
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
          const [me, authedUserID] = data;
          return {
            info: {
              authedUserID,
              hasLiked: me.hasLiked,
              id: me.id,
              author: me.author,
            },
          };
        }),
        tap((action) =>
          this.store.dispatch(TweetsActions.toggleTweet(action.info))
        ),
        exhaustMap((action) => {
          const { hasLiked, authedUserID, id, author } = action.info;
          return forkJoin([
            of(action.info),
            this.tweetsService.saveLikeToggle({
              id,
              author,
              has_liked: hasLiked,
              authed_user_id: authedUserID,
            }),
          ]).pipe(
            map((data) => of()),
            catchError((error) => {
              console.warn('Error in handleToggleTweet: ', error);
              this.store.dispatch(
                //reset the tweet to back it was initially
                TweetsActions.toggleTweet({
                  ...action.info,
                  hasLiked: !action.info.hasLiked,
                })
              );
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
      concatLatestFrom((a) =>
        this.store.select((state) => [
          state.authedUser,
          a.replyingTo
            ? `${a.replyingTo}:${
                state.tweets.find((item) => item.id === a.replyingTo).author
              }`
            : '',
        ])
      ),
      tap(() => this.store.dispatch(LoadingBarActions.showLoading())),
      exhaustMap(([action, [author, replying_to]]) =>
        this.tweetsService
          .saveTweet({ text: action.text, author, replying_to })
          .pipe(
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
    private readonly store: Store<AppState>,
    private readonly tweetsService: TweetsService
  ) {}
}
