import { AuthenticatedUserResponse } from '../response/authenticated-user.response';
import { createAction, props } from '@ngrx/store';

export const fetchAuthenticatedUserAction = createAction(
  '[AuthenticatedUser] Fetch AuthenticatedUser Action'
);

export const fetchAuthenticatedUserSuccessAction = createAction(
  '[AuthenticatedUser] Fetch AuthenticatedUser Success Action',
  props<{ authenticatedUserResponse: AuthenticatedUserResponse }>()
);

export const fetchAuthenticatedUserErrorAction = createAction(
  '[AuthenticatedUser] Fetch AuthenticatedUser Error Action',
  props<{ error: Error }>()
);
