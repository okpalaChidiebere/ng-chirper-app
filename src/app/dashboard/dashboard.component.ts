import { Component, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { selectTweetIds } from '../store/reducers/tweets';

export interface DashboardState {
  tweetIds: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tweetIds$ = this.store.pipe(select(selectTweetIds));

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}
}
