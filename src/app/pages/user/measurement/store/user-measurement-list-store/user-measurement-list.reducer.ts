import { UserMeasurementListResponse } from './response/user-measurement-list.response';
import { UserMeasurementListState } from './user-measurement-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchUserMeasurementListSuccessAction } from './queries/fetch-user-measurement-list/fetch-user-measurement-list.action';

export const userMeasurementListInitialState: UserMeasurementListState = {
  userMeasurementListResponse: null!
};

export const userMeasurementListReducer = createReducer(
  userMeasurementListInitialState,
  on(fetchUserMeasurementListSuccessAction, (state: UserMeasurementListState, { userMeasurementListResponse }: { userMeasurementListResponse: UserMeasurementListResponse[] }) => ({
    ...state,
    userMeasurementListResponse: userMeasurementListResponse
  }))
);
