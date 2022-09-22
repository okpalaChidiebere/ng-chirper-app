import { createActionGroup } from '@ngrx/store';

import { User } from '../../utils/_DATA';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Receive Users ': (users: Record<string, User>) => ({ users }),
  },
});
