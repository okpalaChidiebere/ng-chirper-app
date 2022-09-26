import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { AppStore } from './store';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, TweetComponent],
  imports: [BrowserModule, AppStore, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
