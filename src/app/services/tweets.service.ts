import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Tweet } from '../utils/_DATA';
import { environment } from '../../environments/environment';

const API_HOST = environment.apiHost;

type SaveLikeToggleRequest = {
  id: string;
  author: string;
  hasLiked: boolean;
  authedUserID: string;
};

type SaveTweetRequest = Pick<Tweet, 'text' | 'replyingTo' | 'author'>;

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  constructor(private http: HttpClient) {}

  getTweets(): Observable<Tweet[]> {
    let params = new HttpParams();
    params = params.append('limit', 30);

    return this.http
      .get<{ items: Tweet[]; nextKey: string }>(`${API_HOST}/v0/tweets`, {
        params,
      })
      .pipe(map((res) => res.items));
  }

  //toggle the like button of a tweet
  saveLikeToggle(req: SaveLikeToggleRequest): Observable<{}> {
    return this.http.patch<{}>(`${API_HOST}/v0/tweets`, req);
  }

  //save a tweet
  saveTweet(req: SaveTweetRequest): Observable<Tweet> {
    return this.http.post<Tweet>(`${API_HOST}/v0/tweets`, req);
  }
}
