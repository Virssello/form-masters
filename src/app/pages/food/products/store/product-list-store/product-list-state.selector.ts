import { ProductListState } from './product-list-state';
import { createFeatureSelector } from '@ngrx/store';

export const PRODUCT_LIST_STATE_FEATURE_KEY = 'product-list-state-feature-key';

export const selectProductListState = createFeatureSelector<ProductListState>(PRODUCT_LIST_STATE_FEATURE_KEY);
