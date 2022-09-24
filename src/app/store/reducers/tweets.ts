import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { TweetsActions } from '../actions/tweets';
import { Tweet } from '../../utils/_DATA';
import { AppState } from '.';

export const TWEETS_FEATURE_KEY = 'tweets';
export const getTweetsState = createFeatureSelector(TWEETS_FEATURE_KEY);
export type TweetsState = Record<string, Tweet>;
export const initialState: TweetsState = {};

export const tweetsReducer = createReducer(
  initialState,
  on(TweetsActions.receiveTweets, (state, action) => ({
    ...state,
    ...action.tweets,
  }))
);

export const selectTweets = (state: AppState) => state.tweets;

export const selectTweetIds = createSelector(
  selectTweets,
  (tweets: TweetsState) =>
    Object.keys(tweets).sort(
      (a, b) => Number(tweets[b].timestamp) - Number(tweets[a].timestamp)
    )
);
