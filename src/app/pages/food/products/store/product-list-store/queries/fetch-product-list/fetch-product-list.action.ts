import { ProductListResponse } from '../../response/product-list.response';
import { createAction, props } from '@ngrx/store';

export const fetchProductListAction = createAction(
  '[ProductList] Fetch Product List Action'
);

export const fetchProductListSuccessAction = createAction(
  '[ProductList] Fetch Recipe List Success Action',
  props<{ productListResponse: ProductListResponse[] }>()
);

export const fetchProductListErrorAction = createAction(
  '[ProductList] Fetch Product List Error Action',
  props<{ error: Error }>()
);
