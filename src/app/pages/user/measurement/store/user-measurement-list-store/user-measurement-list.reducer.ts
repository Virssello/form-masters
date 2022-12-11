import { UserMeasurementListResponse } from './response/user-measurement-list.response';
import { UserMeasurementListState } from './user-measurement-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchUserMeasurementListSuccessAction } from './queries/fetch-user-measurement-list/fetch-user-measurement-list.action';

export const userMeasurementListInitialState: UserMeasurementListState = {
  userMeasurementListResponse: [{
    id: 0,
    createdAt: new Date(1111, 11, 11),
    userId: 0,
    weight: 0,
    neck: 0,
    chest: 0,
    stomach: 0,
    hips: 0,
    biceps: 0,
    calf: 0,
    waist: 0
  }]
};

export const userMeasurementListReducer = createReducer(
  userMeasurementListInitialState,
  on(fetchUserMeasurementListSuccessAction, (state: UserMeasurementListState, { userMeasurementListResponse }: { userMeasurementListResponse: UserMeasurementListResponse[] }) => ({
    ...state,
    userMeasurementListResponse: userMeasurementListResponse
  }))
);
