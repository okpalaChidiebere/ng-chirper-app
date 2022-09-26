import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedEffects } from './actions/shared';
import { TweetsEffects } from './actions/tweets';
import metaReducers from './middleware';
import { CombineReducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([SharedEffects, TweetsEffects]),
    CombineReducers,
  ],
})
export class AppStore {}
