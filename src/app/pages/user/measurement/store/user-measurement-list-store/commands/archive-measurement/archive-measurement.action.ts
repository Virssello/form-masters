import { ArchiveMeasurementRequest } from '../../request/archive-measurement.request';
import { createAction, props } from '@ngrx/store';

export const archiveMeasurementAction = createAction(
  '[Measurement] Archive Measurement Action',
  props<{ archiveMeasurement: ArchiveMeasurementRequest }>()
);

export const archiveMeasurementSuccessAction = createAction(
  '[Measurement] Archive Measurement Success Action'
);

export const archiveMeasurementErrorAction = createAction(
  '[Measurement] Archive Measurement Error Action',
  props<{ error: Error }>()
);
