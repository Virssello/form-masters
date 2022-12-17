import { Actions, createEffect, ofType } from '@ngrx/effects';;
import { ArchiveWorkoutRequest } from '../../request/archive-workout.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { archiveWorkoutAction, archiveWorkoutErrorAction, archiveWorkoutSuccessAction } from './archive-workout.action';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ArchiveWorkoutEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public product$ = createEffect(() => this.actions$.pipe(
    ofType(archiveWorkoutAction),
    mergeMap(({ archiveWorkout }: { archiveWorkout: ArchiveWorkoutRequest }) => {
      return this.httpClient.put('/api/workouts/archive-workout', { ...archiveWorkout }).pipe(
        map(() => archiveWorkoutSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Workout archived successful' })),
        catchError((error: Error) => of(archiveWorkoutErrorAction({ error })))
      );
    })
  ));
}
