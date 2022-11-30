import { AuthenticatedUserMeasurementResponse } from './response/authenticated-user-measurement.response';
import { AuthenticatedUserMeasurementState } from './authenticated-user-measurement-state';
import { createReducer, on } from '@ngrx/store';
import { fetchAuthenticatedUserMeasurementSuccessAction } from './queries/fetch-authenticated-user-measurement/fetch-authenticated-user-measurement.action';

export const authenticatedUserMeasurementInitialState: AuthenticatedUserMeasurementState = {
  authenticatedUserMeasurement: {
    id: 0,
    createdAt: new Date(1111, 11, 11),
    userId: 0,
    weight: 0,
    neck: 0,
    chest: 0,
    stomach: 0,
    hips: 0,
    biceps: 0,
    calf: 0,
    waist: 0
  }
};

export const authenticatedUserMeasurementReducer = createReducer(
  authenticatedUserMeasurementInitialState,
  on(fetchAuthenticatedUserMeasurementSuccessAction, (state: AuthenticatedUserMeasurementState, { authenticatedUserMeasurement: authenticatedUserMeasurement }: { authenticatedUserMeasurement: AuthenticatedUserMeasurementResponse }) => ({
    ...state,
    authenticatedUserMeasurement: authenticatedUserMeasurement
  }))
);
