import { ProductState } from './product-state';
import { createFeatureSelector } from '@ngrx/store';

export const PRODUCT_STATE_FEATURE_KEY = 'product-state-feature-key';

export const selectProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_FEATURE_KEY);
