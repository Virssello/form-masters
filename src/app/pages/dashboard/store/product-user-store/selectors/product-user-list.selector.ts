import { ProductUserListState } from '../product-user-list-state';
import { createSelector } from '@ngrx/store';
import { selectProductUserListState } from '../product-user-list-state.selector';

export const selectProductUserList = createSelector(
  selectProductUserListState,
  (state: ProductUserListState) => state.productUserListResponse
);
