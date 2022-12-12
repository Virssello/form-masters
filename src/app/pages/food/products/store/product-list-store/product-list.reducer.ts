import { ProductListResponse } from './response/product-list.response';
import { ProductListState } from './product-list-state';
import { clearProductListAction } from './commands/clear-product-list/clear-product-list.action';
import { createReducer, on } from '@ngrx/store';
import { fetchProductListSuccessAction } from './queries/fetch-product-list/fetch-product-list.action';

export const productListInitialState: ProductListState = {
  productListResponse: null!
};

export const productListReducer = createReducer(
  productListInitialState,
  on(fetchProductListSuccessAction, (state: ProductListState, { productListResponse }: { productListResponse: ProductListResponse[] }) => ({
    ...state,
    productListResponse: productListResponse
  })),

  on(clearProductListAction, () => ({
    ...productListInitialState
  }))
);
