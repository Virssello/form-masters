import { LoginMeasurementRequest } from './request/login-measurement.request';
import { createAction, props } from '@ngrx/store';

export const loginMeasurementAction = createAction(
  '[LoginMeasurementAction] Login Measurement Action',
  props<{ measurement: LoginMeasurementRequest }>()
);

export const loginMeasurementSuccessAction = createAction(
  '[LoginMeasurementAction] Login Measurement Success Action'
);

export const loginMeasurementErrorAction = createAction(
  '[LoginMeasurementAction] Login Measurement Error Action',
  props<{ error: Error }>()
);
