import { UserMeasurementListState } from './user-measurement-list-state';
import { createFeatureSelector } from '@ngrx/store';

export const USER_MEASUREMENT_LIST_STATE_FEATURE_KEY = 'user-measurement-list-state-feature-key';

export const selectUserMeasurementListState = createFeatureSelector<UserMeasurementListState>(USER_MEASUREMENT_LIST_STATE_FEATURE_KEY);
