import { MetaReducer } from '@ngrx/store';

import logger from './logger';
import { environment } from '../../../environments/environment';

const middlewares = [];

//add store middleware for debugging purposes only
if (!environment.production) {
  middlewares.push(logger);
}

const metaReducers: MetaReducer<any>[] = middlewares;
export default metaReducers;
