import { AuthenticatedUserProductResponse } from './response/authenticated-user-product.response';
import { AuthenticatedUserProductState } from './authenticated-user-product-state';
import { createReducer, on } from '@ngrx/store';
import { fetchAuthenticatedUserProductSuccessAction } from './queries/fetch-authenticated-user-product/fetch-authenticated-user-product.action';

export const authenticatedUserProductInitialState: AuthenticatedUserProductState = {
  authenticatedUserProduct: {
    id: 0,
    name: '',
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  }
};

export const authenticatedUserProductReducer = createReducer(
  authenticatedUserProductInitialState,
  on(fetchAuthenticatedUserProductSuccessAction, (state: AuthenticatedUserProductState, { authenticatedUserProduct: authenticatedUserProduct }: { authenticatedUserProduct: AuthenticatedUserProductResponse }) => ({
    ...state,
    authenticatedUserProduct: authenticatedUserProduct
  }))
);
