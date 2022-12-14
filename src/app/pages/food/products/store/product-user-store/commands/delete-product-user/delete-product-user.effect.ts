import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { deleteProductUserAction, deleteProductUserErrorAction, deleteProductUserSuccessAction } from './delete-product-user.action';
import { map } from 'rxjs/operators';

@Injectable()
export class DeleteProductUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store,
              private messageService: MessageService) {}
  public productUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProductUserAction),
    mergeMap(({ id }: { id: number }) => {
      return this.httpClient.delete('api/product-users/delete-product-users', { body: { id } }).pipe(
        map(() => deleteProductUserSuccessAction()),
        tap(() => this.messageService.add({ severity: 'success', detail: 'Product deleted successful' })),
        catchError((error: Error) => of(deleteProductUserErrorAction({ error })))
      );
    })
  ));
}
