import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../../response/user.response';
import { catchError, of, switchMap } from 'rxjs';
import { fetchUserAction, fetchUserErrorAction, fetchUserSuccessAction } from './fetch-user.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedUser$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUserAction),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<UserResponse>(`api/users/${id}`)
        .pipe(
          map((userResponse: UserResponse) => {
            return fetchUserSuccessAction({ userResponse: userResponse });}),
          catchError((error: Error) => of(fetchUserErrorAction({ error })))
        );
    })
  ));
}
