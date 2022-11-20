import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserSignUpRequest } from '../user-sign-up.request';
import { catchError, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { userSignUpAction, userSignUpErrorAction, userSignUpSuccessAction } from './user-sign-up.action';

@Injectable()
export class UserSignUpEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private router: Router,
              private messageService: MessageService) {}

  public userSignUp$ = createEffect(() => this.actions$.pipe(
    ofType(userSignUpAction),
    switchMap(({ user }: { user: UserSignUpRequest }) => this.httpClient.post('api/auth/signup', user)
      .pipe(
        map(() => userSignUpSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', summary: user.username, detail: 'Register successful' })),
        tap(() => this.router.navigate(['/auth/login'])),
        catchError((error: Error) => of(userSignUpErrorAction({ error })))
      ))
  ));
}
