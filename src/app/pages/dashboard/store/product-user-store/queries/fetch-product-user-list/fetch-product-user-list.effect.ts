import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductUserListResponse } from '../../response/product-user-list.response';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchProductUserListAction, fetchProductUserListErrorAction, fetchProductUserListSuccessAction } from './fetch-product-user-list.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchProductUserListEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public productUserListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchProductUserListAction),
    debounceTime(2000),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<ProductUserListResponse[]>(`api/product-users/details/${id}`)
        .pipe(
          map((productUserListResponse: ProductUserListResponse[]) => {
            return fetchProductUserListSuccessAction({ productUserListResponse: productUserListResponse });
          }),
          catchError((error: Error) => of(fetchProductUserListErrorAction({ error })))
        );
    })
  ));
}
