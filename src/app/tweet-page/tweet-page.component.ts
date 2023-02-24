import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';

import { AppState } from '../store/reducers';
import { selectTweets } from '../store/reducers/tweets';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css'],
})
export class TweetPageComponent implements OnInit {
  id$: Observable<string>;
  replies$: Observable<string[]>;
  constructor(
    private readonly store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id$ = this.route.params.pipe(map((params) => params.id));
    this.replies$ = combineLatest([
      this.id$,
      this.store.pipe(select(selectTweets)),
    ]).pipe(
      map(([id, tweets]) => {
        return !tweets.some((tweet) => tweet.id === id)
          ? []
          : Array.from(
              tweets.find((tweet) => tweet.id === id)?.replies ?? []
            ).sort(
              (a, b) =>
                tweets.find((tweet) => tweet.id === b).timestamp -
                tweets.find((tweet) => tweet.id === a).timestamp
            );
      })
    );
  }
}
