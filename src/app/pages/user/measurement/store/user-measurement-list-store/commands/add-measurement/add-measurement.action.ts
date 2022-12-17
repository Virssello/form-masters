import { AddMeasurementRequest } from '../../request/add-measurement.request';
import { createAction, props } from '@ngrx/store';

export const addMeasurementAction = createAction(
  '[Measurement] Add Measurement Action',
  props<{ measurement: AddMeasurementRequest }>()
);

export const addMeasurementSuccessAction = createAction(
  '[Measurement] Add Measurement Success Action'
);

export const addMeasurementErrorAction = createAction(
  '[Measurement] Add Measurement Error Action',
  props<{ error: Error }>()
);
