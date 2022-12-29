import { LoadingState } from './set-loading.state';
import { createSelector } from '@ngrx/store';
import { selectLoadingState } from './set-loading-state.selector';
export const selectLoading = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.showLoading
);
