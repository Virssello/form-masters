import { UserState } from '../user-state';
import { createSelector } from '@ngrx/store';
import { selectUserState } from '../user-state.selector';

export const selectUserWeight = createSelector(
  selectUserState,
  (state: UserState) => state.userResponse.calories
);
