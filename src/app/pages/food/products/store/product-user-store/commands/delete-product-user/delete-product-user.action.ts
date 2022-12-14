import { createAction, props } from '@ngrx/store';

export const deleteProductUserAction = createAction(
  '[ProductUser] Delete Product User Action',
  props<{ id: number }>()
);

export const deleteProductUserSuccessAction = createAction(
  '[ProductUser] Delete Product User Success Action'
);

export const deleteProductUserErrorAction = createAction(
  '[ProductUser] Delete Product User Error Action',
  props<{ error: Error }>()
);
