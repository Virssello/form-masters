import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkoutResponse } from '../../response/workout.response';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchWorkoutAction, fetchWorkoutErrorAction, fetchWorkoutSuccessAction } from './fetch-workout.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchWorkoutEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public workout$ = createEffect(() => this.actions$.pipe(
    ofType(fetchWorkoutAction),
    debounceTime(2000),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<WorkoutResponse>(`api/workouts/${id}`)
        .pipe(
          map((workoutResponse: WorkoutResponse) => {
            return fetchWorkoutSuccessAction({ workoutResponse: workoutResponse });}),
          catchError((error: Error) => of(fetchWorkoutErrorAction({ error })))
        );
    })
  ));
}
