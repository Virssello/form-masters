import { AuthenticatedUserResponse } from './response/authenticated-user.response';
import { AuthenticatedUserState } from './authenticated-user-state';
import { createReducer, on } from '@ngrx/store';
import { fetchAuthenticatedUserSuccessAction } from './queries/fetch-authenticated-user/fetch-authenticated-user.action';

export const authenticatedUserInitialState: AuthenticatedUserState = {
  authenticatedUserResponse: {
    id: 0,
    username: '',
    gender: '',
    age: 0,
    height: 0,
    lifestyle: '',
    goal: ''
  }
};

export const authenticatedUserReducer = createReducer(
  authenticatedUserInitialState,
  on(fetchAuthenticatedUserSuccessAction, (state: AuthenticatedUserState, { authenticatedUserResponse: authenticatedUserResponse }: { authenticatedUserResponse: AuthenticatedUserResponse }) => ({
    ...state,
    authenticatedUserResponse: authenticatedUserResponse
  }))
);
