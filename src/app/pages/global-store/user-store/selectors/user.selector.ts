import { UserState } from '../user-state';
import { createSelector } from '@ngrx/store';
import { selectUserState } from '../user-state.selector';

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.userResponse
);
