import { AddMeasurementRequest } from './request/add-measurement.request';
import { createAction, props } from '@ngrx/store';

export const addMeasurementAction = createAction(
  '[AddMeasurementAction] Add Measurement Action',
  props<{ measurement: AddMeasurementRequest }>()
);

export const addMeasurementSuccessAction = createAction(
  '[AddMeasurementAction] Add Measurement Success Action'
);

export const addMeasurementErrorAction = createAction(
  '[AddMeasurementAction] Add Measurement Error Action',
  props<{ error: Error }>()
);
