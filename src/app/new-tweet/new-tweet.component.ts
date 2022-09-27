import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css'],
})
export class NewTweetComponent implements OnInit, OnDestroy {
  text = new FormControl('');
  tweetLeft: number = 280;
  sub: Subscription;
  constructor() {}

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
    console.log(this.text.value);

    //todo: Add tweet to store
    //todo" redirect to home view if submitted
  }
}
