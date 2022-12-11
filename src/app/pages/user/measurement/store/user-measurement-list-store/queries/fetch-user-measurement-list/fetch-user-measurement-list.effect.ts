import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMeasurementListResponse } from '../../response/user-measurement-list.response';
import { catchError, of, switchMap } from 'rxjs';
import { fetchUserMeasurementListAction, fetchUserMeasurementListErrorAction, fetchUserMeasurementListSuccessAction } from './fetch-user-measurement-list.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchUserMeasurementListEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public measurementListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUserMeasurementListAction),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<UserMeasurementListResponse[]>(`api/measurements/user/${id}`)
        .pipe(
          map((measurementListResponse: UserMeasurementListResponse[]) => {
            return fetchUserMeasurementListSuccessAction({ userMeasurementListResponse: measurementListResponse });}),
          catchError((error: Error) => of(fetchUserMeasurementListErrorAction({ error })))
        );
    })
  ));
}
