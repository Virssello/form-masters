import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserLoginRequest } from '../request/user-login.request';
import { UserLoginResponse } from '../response/user-login.response';
import { catchError, of, switchMap, tap } from 'rxjs';
import { fetchAuthenticatedUserAction } from '../../../store/queries/fetch-authenticated-user.action';
import { map } from 'rxjs/operators';
import { userLoginAction, userLoginErrorAction, userLoginSuccessAction } from './user-login.action';

@Injectable()
export class UserLoginEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private router: Router,
              private messageService: MessageService) {}

  public userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(userLoginAction),
    switchMap(({ user }: { user: UserLoginRequest }) => {
      return this.httpClient.post<UserLoginResponse>('api/auth/login', user)
        .pipe(
          map((token: UserLoginResponse) => {
            localStorage.setItem('token', token.token);
            return userLoginSuccessAction({ token: token });
          }),
          tap(() => this.store.dispatch(fetchAuthenticatedUserAction())),
          tap(() => this.router.navigate(['/home'])),
          tap(() => this.messageService.add({ severity: 'success', summary: user.username, detail: 'Login successful' })),
          catchError((error: Error) => of(userLoginErrorAction({ error })))
        );
    })
  ));
}
