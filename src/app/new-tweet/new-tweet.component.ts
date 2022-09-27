import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TweetsActions } from '../store/actions/tweets';
import { AppState } from '../store/reducers';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css'],
})
export class NewTweetComponent implements OnInit, OnDestroy {
  @Input() id: string | null;

  text = new FormControl('');
  tweetLeft: number = 280;
  sub: Subscription;
  constructor(
    private readonly store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    //we will be warning the user when they are running out of space
    this.sub = this.text.valueChanges.subscribe((v) => {
      this.tweetLeft = 280 - v.length;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.store.dispatch(
      TweetsActions.handleAddTweet({
        text: this.text.value,
        replyingTo: this.id,
      })
    );

    this.text.setValue('');

    //redirect to home view if submitted and this new tweet is not a reply tweet
    /**For other ways you can go about this
     * @see https://stackoverflow.com/questions/50566128/angular-router-navigation-inside-ngrx-effect
     */
    if (!this.id) {
      this.router.navigate(['']);
    }
  }
}
