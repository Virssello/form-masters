import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddProductUserRequest } from '../../request/add-product-user.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { addProductUserAction, addProductUserErrorAction, addProductUserSuccessAction } from './add-product-user.action';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AddProductUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public productUser$ = createEffect(() => this.actions$.pipe(
    ofType(addProductUserAction),
    mergeMap(({ addProductUser }: { addProductUser: AddProductUserRequest }) => {
      return this.httpClient.post('api/product-users/create-product-users', { ...addProductUser }).pipe(
        map(() => addProductUserSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Product saved successful' })),
        catchError((error: Error) => of(addProductUserErrorAction({ error })))
      );
    })
  ));
}
