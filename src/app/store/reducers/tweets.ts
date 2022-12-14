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
  })),
  on(TweetsActions.toggleTweet, (state, action) => ({
    ...state, //spread of all of the previous tweets
    [action.id]: {
      ...state[action.id],
      //we remove or add the username based on of the logged in user has liked the tweet or not
      likes:
        action.hasLiked === true
          ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
          : state[action.id].likes.concat([action.authedUser]),
    },
  })),
  on(TweetsActions.addTweet, (state, action) => {
    const { tweet } = action;

    let replyingTo = {};
    //handle case where we are replying to a tweet
    if (tweet.replyingTo !== null) {
      replyingTo = {
        [tweet.replyingTo]: {
          ...state[tweet.replyingTo],
          replies: state[tweet.replyingTo].replies.concat([tweet.id]),
        },
      };
    }

    return {
      ...state,
      [action.tweet.id]: action.tweet, //add the new tweet to our array of tweets
      ...replyingTo,
    };
  })
);

export const selectTweets = (state: AppState) => state.tweets;

export const selectTweetIds = createSelector(
  selectTweets,
  (tweets: TweetsState) =>
    Object.keys(tweets).sort(
      (a, b) => Number(tweets[b].timestamp) - Number(tweets[a].timestamp)
    )
);
