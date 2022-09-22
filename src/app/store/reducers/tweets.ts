import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import { TweetsActions } from '../actions/tweets';
import { Tweet } from '../../utils/_DATA';

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
