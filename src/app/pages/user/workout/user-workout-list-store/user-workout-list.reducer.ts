import { UserWorkoutListResponse } from './response/user-workout-list.response';
import { UserWorkoutListState } from './user-workout-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchUserWorkoutListSuccessAction } from './queries/fetch-user-workout-list/fetch-user-workout-list.action';

export const userWorkoutListInitialState: UserWorkoutListState = {
  userWorkoutListResponse: [{
    id: 0,
    name: '',
    exercises: ['']
  }]
};

export const userWorkoutListReducer = createReducer(
  userWorkoutListInitialState,
  on(fetchUserWorkoutListSuccessAction, (state: UserWorkoutListState, { userWorkoutListResponse }: { userWorkoutListResponse: UserWorkoutListResponse[] }) => ({
    ...state,
    userWorkoutListResponse: userWorkoutListResponse
  }))
);
