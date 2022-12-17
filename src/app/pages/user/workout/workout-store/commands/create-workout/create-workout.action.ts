import { CreateWorkoutRequest } from '../../request/create-workout.request';
import { createAction, props } from '@ngrx/store';

export const createWorkoutAction = createAction(
  '[Workout] Create Workout Action',
  props<{ workout: CreateWorkoutRequest }>()
);

export const createWorkoutSuccessAction = createAction(
  '[Workout] Create Workout Success Action'
);

export const createWorkoutErrorAction = createAction(
  '[Workout] Create Workout Error Action',
  props<{ error: Error }>()
);
