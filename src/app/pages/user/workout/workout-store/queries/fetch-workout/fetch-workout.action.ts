import { WorkoutResponse } from '../../response/workout.response';
import { createAction, props } from '@ngrx/store';

export const fetchWorkoutAction = createAction(
  '[Workout] Fetch Workout Action',
  props<{ id: number }>()
);

export const fetchWorkoutSuccessAction = createAction(
  '[Workout] Fetch Workout Success Action',
  props<{ workoutResponse: WorkoutResponse }>()
);

export const fetchWorkoutErrorAction = createAction(
  '[Workout] Fetch Workout Error Action',
  props<{ error: Error }>()
);
