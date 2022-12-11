import { UserWorkoutListResponse } from '../../response/user-workout-list.response';
import { createAction, props } from '@ngrx/store';

export const fetchUserWorkoutListAction = createAction(
  '[Workout] Fetch User Workout List Action',
  props<{ id: number }>()
);

export const fetchUserWorkoutListSuccessAction = createAction(
  '[Workout] Fetch User Workout List Success Action',
  props<{ userWorkoutListResponse: UserWorkoutListResponse[] }>()
);

export const fetchUserWorkoutListErrorAction = createAction(
  '[Workout] Fetch User Workout List Error Action',
  props<{ error: Error }>()
);
