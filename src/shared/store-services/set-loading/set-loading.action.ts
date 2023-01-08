import { createAction, props } from '@ngrx/store';

export const setLoadingAction = createAction(
  '[Loading] Set Loading Action',
  props<{ showLoading: boolean }>()
);
