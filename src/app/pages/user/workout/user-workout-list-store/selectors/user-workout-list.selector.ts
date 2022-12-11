import { UserWorkoutListState } from '../user-workout-list-state';
import { createSelector } from '@ngrx/store';
import { selectUserWorkoutListState } from '../user-workout-list-state.selector';

export const selectUserWorkoutList = createSelector(
  selectUserWorkoutListState,
  (state: UserWorkoutListState) => state.userWorkoutListResponse
);
