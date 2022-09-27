import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css'],
})
export class TweetPageComponent implements OnInit {
  id = '8xf0y6ziyjabvozdd253nd'; //this will be later coming in from angular router
  replies: string[] = [];
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({ tweets }) => {
      this.replies = !tweets[this.id]
        ? []
        : Array.from(tweets[this.id].replies).sort(
            (a, b) => tweets[b].timestamp - tweets[a].timestamp
          );
    });
  }
}
