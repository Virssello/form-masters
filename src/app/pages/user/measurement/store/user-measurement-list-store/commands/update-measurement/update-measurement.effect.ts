import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UpdateMeasurementRequest } from '../../request/update-measurement.request';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { updateMeasurementAction, updateMeasurementErrorAction, updateMeasurementSuccessAction } from './update-measurement.action';

@Injectable()
export class UpdateMeasurementEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public product$ = createEffect(() => this.actions$.pipe(
    ofType(updateMeasurementAction),
    mergeMap(({ updateMeasurement }: { updateMeasurement: UpdateMeasurementRequest }) => {
      return this.httpClient.put('/api/measurements/edit-measurement', { ...updateMeasurement }).pipe(
        map(() => updateMeasurementSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Measurement updated successful' })),
        catchError((error: Error) => of(updateMeasurementErrorAction({ error })))
      );
    })
  ));
}
