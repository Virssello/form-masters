import { UserWorkoutListState } from './user-workout-list-state';
import { createFeatureSelector } from '@ngrx/store';

export const USER_WORKOUT_LIST_STATE_FEATURE_KEY = 'user-workout-list-state-feature-key';

export const selectUserWorkoutListState = createFeatureSelector<UserWorkoutListState>(USER_WORKOUT_LIST_STATE_FEATURE_KEY);
