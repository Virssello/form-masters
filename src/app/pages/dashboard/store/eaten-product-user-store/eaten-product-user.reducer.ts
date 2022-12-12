import { EatenProductUserResponse } from './response/eaten-product-user.response';
import { EatenProductUserState } from './eaten-product-user-state';
import {
  clearProductListAction
} from '../../../food/products/store/product-list-store/commands/clear-product-list/clear-product-list.action';
import { createReducer, on } from '@ngrx/store';
import { fetchProductSuccessAction } from './queries/fetch-eaten-product-user/fetch-eaten-product-user.action';

export const eatenProductUserInitialState: EatenProductUserState = {
  eatenProductUserResponse: null!
};

export const eatenProductUserReducer = createReducer(
  eatenProductUserInitialState,
  on(fetchProductSuccessAction, (state: EatenProductUserState, { eatenProductUserResponse: eatenProductUserResponse }: { eatenProductUserResponse: EatenProductUserResponse }) => ({
    ...state,
    eatenProductUserResponse: eatenProductUserResponse
  })),
  on(clearProductListAction, () => ({
    ...eatenProductUserInitialState
  }))
);
