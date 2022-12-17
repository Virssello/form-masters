import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArchiveMeasurementRequest } from '../../request/archive-measurement.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { archiveMeasurementAction, archiveMeasurementErrorAction, archiveMeasurementSuccessAction } from './archive-measurement.action';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArchiveMeasurementEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public product$ = createEffect(() => this.actions$.pipe(
    ofType(archiveMeasurementAction),
    mergeMap(({ archiveMeasurement }: { archiveMeasurement: ArchiveMeasurementRequest }) => {
      return this.httpClient.put('/api/measurements/archive-measurement', { ...archiveMeasurement }).pipe(
        map(() => archiveMeasurementSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Measurement archived successful' })),
        catchError((error: Error) => of(archiveMeasurementErrorAction({ error })))
      );
    })
  ));
}
