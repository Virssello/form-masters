import { LoadingState } from './set-loading.state';
import { createFeatureSelector } from '@ngrx/store';

export const LOADING_STATE_FEATURE_KEY = 'loading-state-feature-key';

export const selectLoadingState = createFeatureSelector<LoadingState>(LOADING_STATE_FEATURE_KEY);
