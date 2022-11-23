import { UserState } from './user-state';
import { createFeatureSelector } from '@ngrx/store';

export const USER_STATE_FEATURE_KEY = 'user-state-feature-key';

export const selectUserState = createFeatureSelector<UserState>(USER_STATE_FEATURE_KEY);
