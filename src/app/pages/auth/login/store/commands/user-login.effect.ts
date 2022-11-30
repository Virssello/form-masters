import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, catchError, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { UserLoginRequest } from '../request/user-login.request';
import { UserLoginResponse } from '../response/user-login.response';
import { fetchAuthenticatedUserAction } from '../../../../global-store/authenticated-user/queries/fetch-authenticated-user/fetch-authenticated-user.action';
import { map } from 'rxjs/operators';
import { selectAuthenticatedUserCalories } from '../../../../global-store/authenticated-user/selectors/authenticated-user-calories.selector';
import { userLoginAction, userLoginErrorAction, userLoginSuccessAction } from './user-login.action';

@Injectable()
export class UserLoginEffect implements OnDestroy {
  private destroy$ = new Subject<void>;

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private router: Router,
              private messageService: MessageService,
              private jwtHelperService: JwtHelperService) {}

  public userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(userLoginAction),
    switchMap(({ user }: { user: UserLoginRequest }) => {
      return this.httpClient.post<UserLoginResponse>('api/auth/login', user)
        .pipe(
          map((token: UserLoginResponse) => {
            localStorage.setItem('token', token.token);
            return userLoginSuccessAction({ token: token });
          }),
          tap(() => {
            const decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());

            return this.store.dispatch(fetchAuthenticatedUserAction({ id: decodedToken.id }));
          }),
          tap(() => {
            this.store.select(selectAuthenticatedUserCalories).pipe(
              //TODO Figure out different way to fetch last observable
              take(2),
              tap((calories: any) => {
                if (Boolean(calories)) {
                  return this.router.navigate(['/home']);
                } else {
                  return this.router.navigate(['/login-measurement']);
                }
              }),
              takeUntil(this.destroy$)
            ).subscribe();
          }),
          tap(() => this.messageService.add({ severity: 'success', summary: user.username, detail: 'Login successful' })),
          catchError((error: Error) => of(userLoginErrorAction({ error })))
        );
    })
  ));

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
