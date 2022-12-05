import { AuthenticatedUserProductState } from '../authenticated-user-product-state';
import { createSelector } from '@ngrx/store';
import { selectAuthenticatedUserProductState } from '../authenticated-user-product-state.selector';

export const selectAuthenticatedUserProduct = createSelector(
  selectAuthenticatedUserProductState,
  (state: AuthenticatedUserProductState) => state.authenticatedUserProduct
);

