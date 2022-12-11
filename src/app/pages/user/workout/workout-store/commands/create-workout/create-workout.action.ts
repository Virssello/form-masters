import { WorkoutRequest } from './request/workout.request';
import { createAction, props } from '@ngrx/store';

export const createWorkoutAction = createAction(
  '[Workout] Create Workout Action',
  props<{ workout: WorkoutRequest }>()
);

export const createWorkoutSuccessAction = createAction(
  '[Workout] Create Workout Success Action'
);

export const createWorkoutErrorAction = createAction(
  '[Workout] Create Workout Error Action',
  props<{ error: Error }>()
);
