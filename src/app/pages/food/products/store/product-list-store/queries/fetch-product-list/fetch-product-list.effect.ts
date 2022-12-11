import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductListResponse } from '../../response/product-list.response';
import { catchError, of, switchMap } from 'rxjs';
import { fetchProductListAction, fetchProductListErrorAction, fetchProductListSuccessAction } from './fetch-product-list.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchProductListEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public productListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchProductListAction),
    switchMap(() => {
      return this.httpClient.get<ProductListResponse[]>('api/products')
        .pipe(
          map((productListResponse: ProductListResponse[]) => {
            return fetchProductListSuccessAction({ productListResponse: productListResponse });}),
          catchError((error: Error) => of(fetchProductListErrorAction({ error })))
        );
    })
  ));
}
