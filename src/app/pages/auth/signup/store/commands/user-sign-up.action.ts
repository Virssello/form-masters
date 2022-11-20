import { UserSignUpRequest } from '../user-sign-up.request';
import { createAction, props } from '@ngrx/store';

export const userSignUpAction = createAction(
  '[UserSignUpAction] User Sign Up Action',
  props<{ user: UserSignUpRequest }>()
);

export const userSignUpSuccessAction = createAction(
  '[UserSignUpAction] User Sign Up Success Action'
);

export const userSignUpErrorAction = createAction(
  '[UserSignUpAction] User Sign Up Error Action',
  props<{ error: Error }>()
);
