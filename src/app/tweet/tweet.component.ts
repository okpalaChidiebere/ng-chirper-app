import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TweetsActions } from '../store/actions/tweets';
import { AppState } from '../store/reducers';
import { FormatedTweet, formatTweet } from '../utils/helpers';

interface TweetState {
  tweet: FormatedTweet | null;
}
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  providers: [ComponentStore],
})
export class TweetComponent implements OnChanges, OnDestroy {
  @Input() id: string;
  subId: Subscription;
  tweet$ = this.componentStore.select((state) => state.tweet);

  constructor(
    private readonly componentStore: ComponentStore<TweetState>,
    private readonly store: Store<AppState>,
    private router: Router
  ) {
    this.componentStore.setState({
      tweet: null,
    });
  }

  //whenever the input id changes, we want to re-render the component with the new tweet
  ngOnChanges(changes: SimpleChanges): void {
    this.subId = this.store.subscribe(
      ({ authedUser, tweets, users }: AppState) => {
        const tweet = tweets.find((item) => item.id === this.id);
        /**
         * We handled an edge case where the user might try to access a
         * tweet with an invalid id
         */
        const parentTweet = tweet
          ? tweets.find((item) => item.id === tweet.replyingTo)
          : null; //we know if a tweet is a reply to another tweet

        this.componentStore.setState({
          tweet: tweet
            ? formatTweet(
                tweet,
                users.find((item) => item.id === tweet.author),
                authedUser,
                parentTweet
              )
            : null,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subId.unsubscribe();
  }

  toParent(e, tweetId: string) {
    e.stopPropagation();
    e.preventDefault();

    //take the user to the tweet that they are replying to
    this.router.navigate(['/tweet', tweetId]); //declarative way of navigating to a page
  }

  handleLike(e, info: Pick<FormatedTweet, 'hasLiked' | 'id' | 'author'>) {
    e.stopPropagation();
    e.preventDefault();

    this.store.dispatch(TweetsActions.handleToggleTweet(info));
  }
}
