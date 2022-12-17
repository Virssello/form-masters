import { WorkoutListState } from './workout-list-state';
import { createFeatureSelector } from '@ngrx/store';

export const WORKOUT_LIST_STATE_FEATURE_KEY = 'workout-list-state-feature-key';

export const selectWorkoutListState = createFeatureSelector<WorkoutListState>(WORKOUT_LIST_STATE_FEATURE_KEY);
