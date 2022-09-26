import { createActionGroup, emptyProps } from '@ngrx/store';

export const LoadingBarActions = createActionGroup({
  source: 'loading-bar',
  events: {
    'Show Loading': emptyProps(),
    'Hide Loading': emptyProps(),
  },
});
