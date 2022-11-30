import { AuthenticatedUserMeasurementState } from './authenticated-user-measurement-state';
import { createFeatureSelector } from '@ngrx/store';

export const AUTHENTICATED_USER_MEASUREMENT_STATE_FEATURE_KEY = 'measurement-state-feature-key';

export const selectAuthenticatedUserMeasurementState = createFeatureSelector<AuthenticatedUserMeasurementState>(AUTHENTICATED_USER_MEASUREMENT_STATE_FEATURE_KEY);
