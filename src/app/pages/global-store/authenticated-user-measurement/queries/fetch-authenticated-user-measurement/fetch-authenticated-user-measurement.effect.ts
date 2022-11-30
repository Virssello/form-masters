import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticatedUserMeasurementResponse } from '../../response/authenticated-user-measurement.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import {
  fetchAuthenticatedUserMeasurementAction, fetchAuthenticatedUserMeasurementErrorAction,
  fetchAuthenticatedUserMeasurementSuccessAction
} from './fetch-authenticated-user-measurement.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchAuthenticatedUserMeasurementEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedUserMeasurement$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAuthenticatedUserMeasurementAction),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<AuthenticatedUserMeasurementResponse>(`api/measurements/user/${id}`)
        .pipe(
          map((authenticatedUserMeasurement: AuthenticatedUserMeasurementResponse) => {
            return fetchAuthenticatedUserMeasurementSuccessAction({ authenticatedUserMeasurement: authenticatedUserMeasurement });}),
          catchError((error: Error) => of(fetchAuthenticatedUserMeasurementErrorAction({ error })))
        );
    })
  ));
}
