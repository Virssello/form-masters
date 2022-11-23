import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginMeasurementRequest } from '../login-measurement.request';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, tap } from 'rxjs';
import { loginMeasurementAction, loginMeasurementErrorAction, loginMeasurementSuccessAction } from './login-measurement.action';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginMeasurementEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private router: Router,
              private messageService: MessageService) {}

  public loginMeasurement$ = createEffect(() => this.actions$.pipe(
    ofType(loginMeasurementAction),
    switchMap(({ measurement }: { measurement: LoginMeasurementRequest }) => {
      return this.httpClient.post('api/measurements/create-measurement', {
        userId: 1,
        ...measurement
      })
        .pipe(
          map(() => loginMeasurementSuccessAction()),
          tap(() => this.messageService.add({ severity: 'success', detail: 'Measurement saved successful' })),
          tap(() => this.router.navigate(['/home'])),
          catchError((error: Error) => of(loginMeasurementErrorAction({ error })))
        );})
  ));
}
