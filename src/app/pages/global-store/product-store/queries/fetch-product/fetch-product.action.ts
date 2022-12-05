import { ProductResponse } from '../../response/product.response';
import { createAction, props } from '@ngrx/store';

export const fetchProductAction = createAction(
  '[Product] Fetch Product Action',
  props<{ id: number }>()
);

export const fetchProductSuccessAction = createAction(
  '[Product] Fetch Product Success Action',
  props<{ productResponse: ProductResponse }>()
);

export const fetchProductErrorAction = createAction(
  '[Product] Fetch Product Error Action',
  props<{ error: Error }>()
);
