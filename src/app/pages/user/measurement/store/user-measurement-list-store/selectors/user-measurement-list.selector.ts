import { UserMeasurementListState } from '../user-measurement-list-state';
import { createSelector } from '@ngrx/store';
import { selectUserMeasurementListState } from '../user-measurement-list-state.selector';

export const selectUserMeasurementList = createSelector(
  selectUserMeasurementListState,
  (state: UserMeasurementListState) => state.userMeasurementListResponse
);
