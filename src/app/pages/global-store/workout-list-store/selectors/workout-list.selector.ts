import { WorkoutListState } from '../workout-list-state';
import { createSelector } from '@ngrx/store';
import { selectWorkoutListState } from '../workout-list-state.selector';

export const selectWorkoutList = createSelector(
  selectWorkoutListState,
  (state: WorkoutListState) => state.workoutListResponse
);
