import { ProductUserListResponse } from '../../response/product-user-list.response';
import { createAction, props } from '@ngrx/store';

export const fetchProductUserListAction = createAction(
  '[ProductUserList] Fetch Product User List Action',
  props<{ id: number }>()
);

export const fetchProductUserListSuccessAction = createAction(
  '[ProductUserList] Fetch Product User List Success Action',
  props<{ productUserListResponse: ProductUserListResponse[] }>()
);

export const fetchProductUserListErrorAction = createAction(
  '[ProductUserList] Fetch Product User List Error Action',
  props<{ error: Error }>()
);
