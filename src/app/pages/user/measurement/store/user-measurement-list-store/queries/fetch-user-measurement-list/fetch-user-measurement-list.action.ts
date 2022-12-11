import { UserMeasurementListResponse } from '../../response/user-measurement-list.response';
import { createAction, props } from '@ngrx/store';

export const fetchUserMeasurementListAction = createAction(
  '[Measurement] Fetch User Measurement List Action',
  props<{ id: number }>()
);

export const fetchUserMeasurementListSuccessAction = createAction(
  '[Measurement] Fetch User Measurement List Success Action',
  props<{ userMeasurementListResponse: UserMeasurementListResponse[] }>()
);

export const fetchUserMeasurementListErrorAction = createAction(
  '[Measurement] Fetch User Measurement List Error Action',
  props<{ error: Error }>()
);
