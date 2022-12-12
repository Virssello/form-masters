import { EatenProductUserState } from './eaten-product-user-state';
import { createFeatureSelector } from '@ngrx/store';

export const EATEN_PRODUCT_USER_STATE_FEATURE_KEY = 'eaten-product-user-state-feature-key';

export const selectEatenProductUserState = createFeatureSelector<EatenProductUserState>(EATEN_PRODUCT_USER_STATE_FEATURE_KEY);
