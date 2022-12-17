import { MeasurementState } from './measurement-state';
import { createFeatureSelector } from '@ngrx/store';

export const MEASUREMENT_STATE_FEATURE_KEY = 'measurement-state-feature-key';

export const selectMeasurementState = createFeatureSelector<MeasurementState>(MEASUREMENT_STATE_FEATURE_KEY);
