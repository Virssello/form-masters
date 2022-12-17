import { ArchiveWorkoutRequest } from '../../request/archive-workout.request';
import { createAction, props } from '@ngrx/store';

export const archiveWorkoutAction = createAction(
  '[Workout] Archive Workout Action',
  props<{ archiveWorkout: ArchiveWorkoutRequest }>()
);

export const archiveWorkoutSuccessAction = createAction(
  '[Workout] Archive Workout Success Action'
);

export const archiveWorkoutErrorAction = createAction(
  '[Workout] Archive Workout Error Action',
  props<{ error: Error }>()
);
