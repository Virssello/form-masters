import { WorkoutState } from '../workout-state';
import { createSelector } from '@ngrx/store';
import { selectWorkoutState } from '../workout-state.selector';

export const selectWorkout = createSelector(
  selectWorkoutState,
  (state: WorkoutState) => state.workoutResponse
);
