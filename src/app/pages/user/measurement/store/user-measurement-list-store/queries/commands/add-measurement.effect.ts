import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddMeasurementRequest } from './request/add-measurement.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { addMeasurementAction, addMeasurementErrorAction, addMeasurementSuccessAction } from './add-measurement.action';
import { catchError, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AddMeasurementEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}

  public addMeasurement$ = createEffect(() => this.actions$.pipe(
    ofType(addMeasurementAction),
    switchMap(({ measurement }: { measurement: AddMeasurementRequest }) => {
      return this.httpClient.post('api/measurements/create-measurement', { ...measurement }).pipe(
        map(() => addMeasurementSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Measurement saved successful' })),
        catchError((error: Error) => of(addMeasurementErrorAction({ error })))
      );
    })
  ));
}
