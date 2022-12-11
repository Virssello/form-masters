import { ProductListState } from '../product-list-state';
import { createSelector } from '@ngrx/store';
import { selectProductListState } from '../product-list-state.selector';

export const selectProductList = createSelector(
  selectProductListState,
  (state: ProductListState) => state.productListResponse
);
