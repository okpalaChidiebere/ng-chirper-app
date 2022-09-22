import { createActionGroup } from '@ngrx/store';

import { Tweet, _getTweets } from '../../utils/_DATA';

export const TweetsActions = createActionGroup({
  source: 'Tweets',
  events: {
    'Receive Tweets ': (tweets: Record<string, Tweet>) => ({ tweets }),
  },
});
