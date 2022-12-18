import { Actions, createEffect, ofType } from '@ngrx/effects';;
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UpdateWorkoutRequest } from '../../request/update-workout.request';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { updateWorkoutAction, updateWorkoutErrorAction, updateWorkoutSuccessAction } from './update-workout.action';

@Injectable()
export class UpdateWorkoutEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public product$ = createEffect(() => this.actions$.pipe(
    ofType(updateWorkoutAction),
    mergeMap(({ updateWorkout }: { updateWorkout: UpdateWorkoutRequest }) => {
      return this.httpClient.put('/api/workouts/edit-workout', { ...updateWorkout }).pipe(
        map(() => updateWorkoutSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Workout updated successful' })),
        catchError((error: Error) => of(updateWorkoutErrorAction({ error })))
      );
    })
  ));
}
