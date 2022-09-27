import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { TweetPageComponent } from './tweet-page/tweet-page.component';

//We use Angular Router to render certain components based on the url
const routes: Routes = [
  { path: 'new', component: NewTweetComponent },
  { path: 'tweet/:id', component: TweetPageComponent },
  { path: '', component: DashboardComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule], //must export!
})
export class AppRoutingModule {}
