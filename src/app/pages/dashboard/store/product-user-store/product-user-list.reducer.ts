import { ProductUserListResponse } from './response/product-user-list.response';
import { ProductUserListState } from './product-user-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchProductUserListSuccessAction } from './queries/fetch-product-user-list/fetch-product-user-list.action';

export const productUserListInitialState: ProductUserListState = {
  productUserListResponse: [{
    id: 0,
    createdAt: new Date(1111, 11, 11),
    userId: 0,
    productId: 0,
    weight: 0,
    product: {
      name: '',
      id: 0,
      calories: 0,
      protein: 0,
      carbohydrate:0,
      fat: 0,
    }
  }]
};

export const productUserListReducer = createReducer(
  productUserListInitialState,
  on(fetchProductUserListSuccessAction, (state: ProductUserListState, { productUserListResponse }: { productUserListResponse: ProductUserListResponse[] }) => ({
    ...state,
    productUserListResponse: productUserListResponse
  })),
);
