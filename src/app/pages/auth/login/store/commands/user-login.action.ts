import { UserLoginRequest } from '../request/user-login.request';
import { UserLoginResponse } from '../response/user-login.response';
import { createAction, props } from '@ngrx/store';

export const userLoginAction = createAction(
  '[UserLoginAction] User Login Action',
  props<{ user: UserLoginRequest }>()
);

export const userLoginSuccessAction = createAction(
  '[UserLoginAction] User Login Success Action',
  props<{ token: UserLoginResponse }>()
);

export const userLoginErrorAction = createAction(
  '[UserLoginAction] User Login Error Action',
  props<{ error: Error }>()
);
