import { EatenProductUserState } from '../eaten-product-user-state';
import { createSelector } from '@ngrx/store';
import { selectEatenProductUserState } from '../eaten-product-user-state.selector';

export const selectEatenProductUser = createSelector(
  selectEatenProductUserState,
  (state: EatenProductUserState) => state.eatenProductUserResponse
);
