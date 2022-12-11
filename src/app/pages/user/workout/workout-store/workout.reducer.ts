import { WorkoutResponse } from './response/workout.response';
import { WorkoutState } from './workout-state';
import { createReducer, on } from '@ngrx/store';
import { fetchWorkoutSuccessAction } from './queries/fetch-workout/fetch-workout.action';

export const workoutInitialState: WorkoutState = {
  workoutResponse: {
    id: 0,
    name: '',
    exercises: ['']
  }
};

export const workoutReducer = createReducer(
  workoutInitialState,
  on(fetchWorkoutSuccessAction, (state: WorkoutState, { workoutResponse: workoutResponse }: { workoutResponse: WorkoutResponse }) => ({
    ...state,
    workoutResponse: workoutResponse
  }))
);
