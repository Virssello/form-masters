import { createAction, props } from '@ngrx/store';

export const userLogoutAction = createAction(
  '[UserLogoutAction] User Logout Action'
);

export const userLogoutSuccessAction = createAction(
  '[UserLogoutAction] User Logout Success Action'
);

export const userLogoutErrorAction = createAction(
  '[UserLogoutAction] User Logout Error Action',
  props<{ error: Error }>()
);
