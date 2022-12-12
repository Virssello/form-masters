import { AddProductUserRequest } from '../../request/add-product-user.request';
import { createAction, props } from '@ngrx/store';

export const addProductUserAction = createAction(
  '[ProductUser] Add Product User Action',
  props<{ addProductUser: AddProductUserRequest }>()
);

export const addProductUserSuccessAction = createAction(
  '[ProductUser] Add Product User Success Action'
);

export const addProductUserErrorAction = createAction(
  '[ProductUser] Add Product User Error Action',
  props<{ error: Error }>()
);
