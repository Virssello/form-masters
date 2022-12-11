import { WorkoutListResponse } from '../../response/workout-list.response';
import { createAction, props } from '@ngrx/store';

export const fetchWorkoutListAction = createAction(
  '[WorkoutList] Fetch Workout List Action'
);

export const fetchWorkoutListSuccessAction = createAction(
  '[WorkoutList] Fetch Recipe List Success Action',
  props<{ workoutListResponse: WorkoutListResponse[] }>()
);

export const fetchWorkoutListErrorAction = createAction(
  '[WorkoutList] Fetch Workout List Error Action',
  props<{ error: Error }>()
);
