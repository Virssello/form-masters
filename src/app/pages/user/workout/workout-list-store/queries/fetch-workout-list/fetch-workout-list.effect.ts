import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkoutListResponse } from '../../response/workout-list.response';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchWorkoutListAction, fetchWorkoutListErrorAction, fetchWorkoutListSuccessAction } from './fetch-workout-list.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchWorkoutListEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public workoutListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchWorkoutListAction),
    debounceTime(2000),
    switchMap(() => {
      return this.httpClient.get<WorkoutListResponse[]>('api/workouts')
        .pipe(
          map((workoutListResponse: WorkoutListResponse[]) => {
            return fetchWorkoutListSuccessAction({ workoutListResponse: workoutListResponse });}),
          catchError((error: Error) => of(fetchWorkoutListErrorAction({ error })))
        );
    })
  ));
}
