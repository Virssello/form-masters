import { MeasurementState } from '../measurement-state';
import { createSelector } from '@ngrx/store';
import { selectMeasurementState } from '../measurement-state.selector';

export const selectMeasurement = createSelector(
  selectMeasurementState,
  (state: MeasurementState) => state.measurementResponse
);
