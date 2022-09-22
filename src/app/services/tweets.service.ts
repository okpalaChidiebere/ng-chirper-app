import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { _getTweets, _saveLikeToggle, _saveTweet } from '../utils/_DATA';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  constructor() {}

  getTweets() {
    return from(_getTweets());
  }
}
