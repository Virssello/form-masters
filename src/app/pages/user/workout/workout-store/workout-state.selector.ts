import { WorkoutState } from './workout-state';
import { createFeatureSelector } from '@ngrx/store';

export const WORKOUT_STATE_FEATURE_KEY = 'workout-state-feature-key';

export const selectWorkoutState = createFeatureSelector<WorkoutState>(WORKOUT_STATE_FEATURE_KEY);
