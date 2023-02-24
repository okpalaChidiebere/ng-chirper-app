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
export type TweetsState = Tweet[];
export const initialState: TweetsState = [];

export const tweetsReducer = createReducer(
  initialState,
  on(TweetsActions.receiveTweets, (state, action) => action.tweets),
  on(TweetsActions.toggleTweet, (state, action) =>
    state.map((tweet) =>
      tweet.id !== action.id
        ? tweet
        : Object.assign({}, tweet, {
            //we remove or add the username based on of the logged in user has liked the tweet or not
            likes:
              action.hasLiked === true
                ? tweet.likes?.filter((uid) => uid !== action.authedUserID)
                : tweet.likes?.concat([action.authedUserID]) ?? [
                    action.authedUserID,
                  ],
          })
    )
  ),
  on(TweetsActions.addTweet, (state, action) => {
    const { tweet: mTweet } = action;

    return (
      state
        .map((tweet) =>
          mTweet.replyingTo && tweet.id === mTweet.replyingTo
            ? //handle case where we are replying to a tweet
              Object.assign({}, tweet, {
                //we remove or add the username based on of the logged in user has liked the tweet or not
                replies: tweet.replies?.concat([mTweet.id]) ?? [mTweet.id],
              })
            : tweet
        )
        //add the new tweet to our array of tweets
        .concat([mTweet])
    );
  })
);

export const selectTweets = (state: AppState) => state.tweets;

export const selectTweetIds = createSelector(
  selectTweets,
  (tweets: TweetsState) =>
    Array.from(tweets)
      .sort((a, b) => b.timestamp - a.timestamp) //sort the tweet in descending order (most recent timestamp first)
      .map((tweet) => tweet.id) //get the array of id properties
);
