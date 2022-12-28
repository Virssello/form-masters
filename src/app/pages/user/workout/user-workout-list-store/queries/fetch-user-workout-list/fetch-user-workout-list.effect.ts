import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserWorkoutListResponse } from '../../response/user-workout-list.response';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchUserWorkoutListAction, fetchUserWorkoutListErrorAction, fetchUserWorkoutListSuccessAction } from './fetch-user-workout-list.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchUserWorkoutListEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public workoutListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUserWorkoutListAction),
    debounceTime(2000),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<UserWorkoutListResponse[]>(`api/workouts/user/${id}`)
        .pipe(
          map((workoutListResponse: UserWorkoutListResponse[]) => {
            return fetchUserWorkoutListSuccessAction({ userWorkoutListResponse: workoutListResponse });}),
          catchError((error: Error) => of(fetchUserWorkoutListErrorAction({ error })))
        );
    })
  ));
}
