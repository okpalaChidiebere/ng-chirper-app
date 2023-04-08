import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import {
  Tweet,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
  SaveLikeToggleRequest,
  SaveTweetRequest,
} from '../utils/_DATA';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  getTweets(): Observable<Tweet[]> {
    return from(_getTweets());
  }

  //toggle the like button of a tweet
  saveLikeToggle(req: SaveLikeToggleRequest): Observable<void> {
    return from(_saveLikeToggle(req));
  }

  //save a tweet
  saveTweet(req: SaveTweetRequest): Observable<Tweet> {
    return from(_saveTweet(req));
  }
}
