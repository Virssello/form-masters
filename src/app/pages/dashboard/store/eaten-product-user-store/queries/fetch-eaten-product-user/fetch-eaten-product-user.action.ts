import { EatenProductUserResponse } from '../../response/eaten-product-user.response';
import { createAction, props } from '@ngrx/store';

export const fetchEatenProductUserAction = createAction(
  '[EatenProductUser] Fetch Eaten Product User Action',
  props<{ id: number }>()
);

export const fetchProductSuccessAction = createAction(
  '[EatenProductUser] Fetch Eaten Product User Success Action',
  props<{ eatenProductUserResponse: EatenProductUserResponse }>()
);

export const fetchProductErrorAction = createAction(
  '[EatenProductUser] Fetch Eaten Product User Error Action',
  props<{ error: Error }>()
);
