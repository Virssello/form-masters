import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticatedUserResponse } from '../response/authenticated-user.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchAuthenticatedUserAction, fetchAuthenticatedUserErrorAction, fetchAuthenticatedUserSuccessAction } from './fetch-authenticated-user.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchAuthenticatedUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private jwtHelperService: JwtHelperService) {}

  public authenticatedUser$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAuthenticatedUserAction),
    debounceTime(1700),
    switchMap(() => {
      const decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());

      return this.httpClient.get<AuthenticatedUserResponse>(`api/users/${decodedToken.id}`)
        .pipe(
          map((authenticatedUserResponse: AuthenticatedUserResponse) => {
            return fetchAuthenticatedUserSuccessAction({ authenticatedUserResponse: authenticatedUserResponse });}),
          catchError((error: Error) => of(fetchAuthenticatedUserErrorAction({ error })))
        );
    })
  ));
}
