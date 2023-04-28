import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Tweet } from '../utils/_DATA';
import { environment } from '../../environments/environment';

const API_HOST = `${environment.httpApiHost}/api`;

type SaveLikeToggleRequest = {
  id: string;
  author: string;
  has_liked: boolean;
  authed_user_id: string;
};

type SaveTweetRequest = Pick<Tweet, 'text' | 'author'> & {
  replying_to: string;
};

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  constructor(private http: HttpClient) {}

  getTweets(): Observable<Tweet[]> {
    let limit = 30;

    const params = Object.entries({
      limit,
      next_key: '',
    })
      .map(([key, value]) => `${key}/${value}`)
      .join('/');

    return this.http
      .get<{ items: Tweet[]; next_key: string }>(
        `${API_HOST}/v0/tweets/${params}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(map((res) => res.items));
  }

  //toggle the like button of a tweet
  saveLikeToggle(req: SaveLikeToggleRequest): Observable<{}> {
    return this.http.patch<{}>(`${API_HOST}/v0/tweets`, req, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  //save a tweet
  saveTweet(req: SaveTweetRequest): Observable<Tweet> {
    return this.http
      .post<{ tweet: Tweet }>(`${API_HOST}/v0/tweets`, req, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(map((res) => res.tweet));
  }
}
