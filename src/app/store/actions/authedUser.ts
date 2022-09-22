import { createAction, props } from '@ngrx/store';

export const setAuthedUser = createAction(
  '[Authenticated User] Set User',
  props<{ id: string }>()
);
