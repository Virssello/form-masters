import { LoadingState } from './set-loading.state';
import { createReducer, on } from '@ngrx/store';
import { setLoadingAction } from './set-loading.action';

export const loadingInitialState: LoadingState = {
  showLoading: true
};

export const loadingReducer = createReducer(
  loadingInitialState,
  on(setLoadingAction, (loadingState: LoadingState, { showLoading }: { showLoading: boolean }) => ({
    ...loadingState,
    showLoading
  }))
);
