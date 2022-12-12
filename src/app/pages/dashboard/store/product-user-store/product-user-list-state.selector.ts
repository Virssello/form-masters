import { ProductUserListState } from './product-user-list-state';
import { createFeatureSelector } from '@ngrx/store';

export const PRODUCT_USER_LIST_STATE_FEATURE_KEY = 'product-user-list-state-feature-key';

export const selectProductUserListState = createFeatureSelector<ProductUserListState>(PRODUCT_USER_LIST_STATE_FEATURE_KEY);
