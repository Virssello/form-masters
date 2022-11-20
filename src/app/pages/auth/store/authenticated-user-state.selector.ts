import { AuthenticatedUserState } from './authenticated-user-state';
import { createFeatureSelector } from '@ngrx/store';

export const AUTHENTICATED_USER_STATE_FEATURE_KEY = 'authenticated-user-state-feature-key';

export const selectAuthenticatedUserState = createFeatureSelector<AuthenticatedUserState>(AUTHENTICATED_USER_STATE_FEATURE_KEY);
