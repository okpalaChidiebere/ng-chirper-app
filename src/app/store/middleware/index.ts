import { MetaReducer } from '@ngrx/store';

import logger from './logger';

const metaReducers: MetaReducer<any>[] = [logger];
export default metaReducers;
