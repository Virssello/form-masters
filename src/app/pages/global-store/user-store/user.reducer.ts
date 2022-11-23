import { UserResponse } from './response/user.response';
import { UserState } from './user-state';
import { createReducer, on } from '@ngrx/store';
import { fetchUserSuccessAction } from './queries/fetch-authenticated-user/fetch-user.action';

export const userInitialState: UserState = {
  userResponse: {
    id: 0,
    username: '',
    gender: '',
    age: 0
  }
};

export const userReducer = createReducer(
  userInitialState,
  on(fetchUserSuccessAction, (state: UserState, { userResponse: userResponse }: { userResponse: UserResponse }) => ({
    ...state,
    userResponse: userResponse
  }))
);
