import { AuthenticatedUserMeasurementState } from '../authenticated-user-measurement-state';
import { createSelector } from '@ngrx/store';
import { selectAuthenticatedUserMeasurementState } from '../authenticated-user-measurement-state.selector';

export const selectAuthenticatedUserMeasurement = createSelector(
  selectAuthenticatedUserMeasurementState,
  (state: AuthenticatedUserMeasurementState) => state.authenticatedUserMeasurement
);

