import { MeasurementResponse } from '../../response/measurement.response';
import { createAction, props } from '@ngrx/store';

export const fetchMeasurementAction = createAction(
  '[Measurement] Fetch Measurement Action',
  props<{ id: number }>()
);

export const fetchMeasurementSuccessAction = createAction(
  '[Measurement] Fetch Measurement Success Action',
  props<{ measurementResponse: MeasurementResponse }>()
);

export const fetchMeasurementErrorAction = createAction(
  '[Measurement] Fetch Measurement Error Action',
  props<{ error: Error }>()
);
