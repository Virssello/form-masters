import { WorkoutListResponse } from './response/workout-list.response';
import { WorkoutListState } from './workout-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchWorkoutListSuccessAction } from './queries/fetch-workout-list/fetch-workout-list.action';

export const workoutListInitialState: WorkoutListState = {
  workoutListResponse: [{
    id: 0,
    name: '',
    exercises: ['']
  }]
};

export const workoutListReducer = createReducer(
  workoutListInitialState,
  on(fetchWorkoutListSuccessAction, (state: WorkoutListState, { workoutListResponse }: { workoutListResponse: WorkoutListResponse[] }) => ({
    ...state,
    workoutListResponse: workoutListResponse
  }))
);
