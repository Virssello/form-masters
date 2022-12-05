import { ProductResponse } from './response/product.response';
import { ProductState } from './product-state';
import { createReducer, on } from '@ngrx/store';
import { fetchProductSuccessAction } from './queries/fetch-product/fetch-product.action';

export const productInitialState: ProductState = {
  productResponse: {
    id: 0,
    name: '',
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0
  }
};

export const productReducer = createReducer(
  productInitialState,
  on(fetchProductSuccessAction, (state: ProductState, { productResponse: productResponse }: { productResponse: ProductResponse }) => ({
    ...state,
    productResponse: productResponse
  }))
);
