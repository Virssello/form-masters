import { UpdateWorkoutRequest } from '../../request/update-workout.request';
import { createAction, props } from '@ngrx/store';

export const updateWorkoutAction = createAction(
  '[Workout] Update Workout Action',
  props<{ updateWorkout: UpdateWorkoutRequest }>()
);

export const updateWorkoutSuccessAction = createAction(
  '[Workout] Update Workout Success Action'
);

export const updateWorkoutErrorAction = createAction(
  '[Workout] Update Workout Error Action',
  props<{ error: Error }>()
);
