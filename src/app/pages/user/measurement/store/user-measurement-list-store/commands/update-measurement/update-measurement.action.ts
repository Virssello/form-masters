import { UpdateMeasurementRequest } from '../../request/update-measurement.request';
import { createAction, props } from '@ngrx/store';

export const updateMeasurementAction = createAction(
  '[Measurement] Update Measurement Action',
  props<{ updateMeasurement: UpdateMeasurementRequest }>()
);

export const updateMeasurementSuccessAction = createAction(
  '[Measurement] Update Measurement Success Action'
);

export const updateMeasurementErrorAction = createAction(
  '[Measurement] Update Measurement Error Action',
  props<{ error: Error }>()
);
