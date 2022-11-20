import { AuthenticatedUserResponse } from './response/authenticated-user.response';
import { AuthenticatedUserState } from './authenticated-user-state';
import { createReducer, on } from '@ngrx/store';
import { fetchAuthenticatedUserSuccessAction } from './queries/fetch-authenticated-user.action';

export const authenticatedUserInitalState: AuthenticatedUserState = {
  authenticatedUserResponse: {
    id: 0,
    username: ''
  }
};

export const authenticatedUserReducer = createReducer(
  authenticatedUserInitalState,
  on(fetchAuthenticatedUserSuccessAction, (state: AuthenticatedUserState, { authenticatedUserResponse: authenticatedUserResponse }: { authenticatedUserResponse: AuthenticatedUserResponse }) => ({
    ...state,
    authenticatedUserResponse: authenticatedUserResponse
  }))
);
