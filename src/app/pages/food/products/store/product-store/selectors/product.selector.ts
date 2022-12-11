import { ProductState } from '../product-state';
import { createSelector } from '@ngrx/store';
import { selectProductState } from '../product-state.selector';

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.productResponse
);
