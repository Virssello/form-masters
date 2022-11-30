import { AuthenticatedUserMeasurementResponse } from '../../response/authenticated-user-measurement.response';
import { createAction, props } from '@ngrx/store';

export const fetchAuthenticatedUserMeasurementAction = createAction(
  '[AuthenticatedUserMeasurement] Fetch AuthenticatedUserMeasurement Action',
  props<{ id: number }>()
);

export const fetchAuthenticatedUserMeasurementSuccessAction = createAction(
  '[AuthenticatedUserMeasurement] Fetch AuthenticatedUserMeasurement Success Action',
  props<{ authenticatedUserMeasurement: AuthenticatedUserMeasurementResponse }>()
);

export const fetchAuthenticatedUserMeasurementErrorAction = createAction(
  '[AuthenticatedUserMeasurement] Fetch AuthenticatedUserMeasurement Error Action',
  props<{ error: Error }>()
);
