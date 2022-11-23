import { UserResponse } from '../../response/user.response';
import { createAction, props } from '@ngrx/store';

export const fetchUserAction = createAction(
  '[User] Fetch User Action',
  props<{ id: number }>()
);

export const fetchUserSuccessAction = createAction(
  '[User] Fetch User Success Action',
  props<{ userResponse: UserResponse }>()
);

export const fetchUserErrorAction = createAction(
  '[User] Fetch User Error Action',
  props<{ error: Error }>()
);
