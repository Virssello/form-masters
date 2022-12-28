import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeasurementResponse } from '../../response/measurement.response';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchMeasurementAction, fetchMeasurementErrorAction, fetchMeasurementSuccessAction } from './fetch-measurement.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchMeasurementEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedMeasurement$ = createEffect(() => this.actions$.pipe(
    ofType(fetchMeasurementAction),
    debounceTime(2000),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<MeasurementResponse>(`api/measurements/${id}`)
        .pipe(
          map((measurementResponse: MeasurementResponse) => {
            return fetchMeasurementSuccessAction({ measurementResponse: measurementResponse });}),
          catchError((error: Error) => of(fetchMeasurementErrorAction({ error })))
        );
    })
  ));
}
