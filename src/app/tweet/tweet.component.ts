import { Component, Input, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { TweetsActions } from '../store/actions/tweets';
import { AppState } from '../store/reducers';
import { AuthedUserState } from '../store/reducers/authedUser';
import { FormatedTweet, formatTweet } from '../utils/helpers';

interface TweetState {
  authedUser: AuthedUserState;
  tweet: FormatedTweet | null;
}
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [ComponentStore],
})
export class TweetComponent implements OnInit {
  @Input() id: string;
  tweet$ = this.componentStore.select((state) => state.tweet);

  constructor(
    private readonly componentStore: ComponentStore<TweetState>,
    private readonly store: Store<AppState>
  ) {
    this.componentStore.setState({
      authedUser: null,
      tweet: null,
    });
  }

  ngOnInit(): void {
    this.store.subscribe(({ authedUser, tweets, users }: AppState) => {
      const tweet = tweets[this.id];
      /**
       * We handled an edge case where the user might try to access a
       * tweet with an invalid id
       */
      const parentTweet = tweet ? tweets[`${tweet.replyingTo}`] : null; //we know if a tweet is a reply to another tweet
      this.componentStore.setState({
        authedUser,
        tweet: tweet
          ? formatTweet(
              tweet,
              users[`${tweet.author}`],
              authedUser,
              parentTweet
            )
          : null,
      });
    });
  }

  toParent(tweetId: string) {
    console.log(tweetId);
  }

  handleLike(info: Pick<FormatedTweet, 'hasLiked' | 'id'>) {
    this.store.dispatch(TweetsActions.handleToggleTweet(info));
  }
}
