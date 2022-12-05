import { AuthenticatedUserProductState } from './authenticated-user-product-state';
import { createFeatureSelector } from '@ngrx/store';

export const AUTHENTICATED_USER_PRODUCT_STATE_FEATURE_KEY = 'product-state-feature-key';

export const selectAuthenticatedUserProductState = createFeatureSelector<AuthenticatedUserProductState>(AUTHENTICATED_USER_PRODUCT_STATE_FEATURE_KEY);
