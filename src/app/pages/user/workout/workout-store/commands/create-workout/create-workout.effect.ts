import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CreateWorkoutRequest } from '../../request/create-workout.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, tap } from 'rxjs';
import { createWorkoutAction, createWorkoutErrorAction, createWorkoutSuccessAction } from './create-workout.action';
import { map } from 'rxjs/operators';

@Injectable()
export class CreateWorkoutEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}

  public createWorkout$ = createEffect(() => this.actions$.pipe(
    ofType(createWorkoutAction),
    switchMap(({ workout }: { workout: CreateWorkoutRequest }) => {
      return this.httpClient.post('api/workouts/create-workout', workout)
        .pipe(
          map(() => createWorkoutSuccessAction()),
          tap(() => this.messageService.add({ severity: 'success', detail: 'Workout created successful' })),
          catchError((error: Error) => of(createWorkoutErrorAction({ error })))
        );
    })
  ));
}
