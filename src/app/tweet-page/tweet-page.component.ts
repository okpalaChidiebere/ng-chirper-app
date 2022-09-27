import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css'],
})
export class TweetPageComponent implements OnInit {
  id: string | null;
  replies: string[] = [];
  constructor(
    private readonly store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); //initialize the id first

    this.store.subscribe(({ tweets }) => {
      this.replies = !tweets[this.id]
        ? []
        : Array.from(tweets[this.id].replies).sort(
            (a, b) => tweets[b].timestamp - tweets[a].timestamp
          );
    });
  }
}
