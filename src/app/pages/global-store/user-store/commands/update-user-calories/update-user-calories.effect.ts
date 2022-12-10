import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UpdateUserCaloriesRequest } from '../../request/update-user-calories.request';
import { catchError, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { updateUserCaloriesAction, updateUserCaloriesErrorAction, updateUserCaloriesSuccessAction } from './update-user-calories.action';

@Injectable()
export class UpdateUserCaloriesEffect {
  constructor(private store: Store,
              private httpClient: HttpClient,
              private actions$: Actions,
              private messageService: MessageService) {
  }

  public updateUserCalories$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserCaloriesAction),
    switchMap(({ updateUserCalories }: { updateUserCalories: UpdateUserCaloriesRequest }) => {
      return this.httpClient.put('api/users/update-calories', { ...updateUserCalories }).pipe(
        map(() => updateUserCaloriesSuccessAction()),
        catchError((error: Error) => of(updateUserCaloriesErrorAction({ error })))
      );
    })
  ));
}
