import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppStore } from './store';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { TweetPageComponent } from './tweet-page/tweet-page.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TweetComponent,
    NewTweetComponent,
    TweetPageComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppStore,
    MatIconModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, //imported the module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
