import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticatedUserResponse } from '../response/authenticated-user.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { fetchAuthenticatedUserAction, fetchAuthenticatedUserErrorAction, fetchAuthenticatedUserSuccessAction } from './fetch-authenticated-user.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchAuthenticatedUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedUser$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAuthenticatedUserAction),
    switchMap(() => this.httpClient.get<AuthenticatedUserResponse>('api/auth/')
      .pipe(
        map((authenticatedUserResponse: AuthenticatedUserResponse) => fetchAuthenticatedUserSuccessAction({ authenticatedUserResponse: authenticatedUserResponse })),
        catchError((error: Error) => of(fetchAuthenticatedUserErrorAction({ error })))
      ))
  ));
}
