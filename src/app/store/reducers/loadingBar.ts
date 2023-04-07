import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import { LoadingBarActions } from '../actions/loadingBar';

export const LOADING_BAR_FEATURE_KEY = 'loadingBar';
export const getLoadingBarState = createFeatureSelector(
  LOADING_BAR_FEATURE_KEY
);
export type LoadingBarState = boolean;
export const initialState: LoadingBarState = false;

export const LoadingBarReducer = createReducer(
  initialState,
  on(LoadingBarActions.showLoading, (state, action) => true),
  on(LoadingBarActions.hideLoading, (state, action) => false)
);
