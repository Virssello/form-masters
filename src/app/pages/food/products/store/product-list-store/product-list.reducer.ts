import { ProductListResponse } from './response/product-list.response';
import { ProductListState } from './product-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchProductListSuccessAction } from './queries/fetch-product-list/fetch-product-list.action';

export const productListInitialState: ProductListState = {
  productListResponse: [{
    id: 0,
    name: '',
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0
  }]
};

export const productListReducer = createReducer(
  productListInitialState,
  on(fetchProductListSuccessAction, (state: ProductListState, { productListResponse }: { productListResponse: ProductListResponse[] }) => ({
    ...state,
    productListResponse: productListResponse
  }))
);
