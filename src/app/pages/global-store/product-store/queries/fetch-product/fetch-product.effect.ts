import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../../response/product.response';
import { catchError, of, switchMap } from 'rxjs';
import { fetchProductAction, fetchProductErrorAction, fetchProductSuccessAction } from './fetch-product.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchProductEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fetchProductAction),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<ProductResponse>(`api/products/${id}`)
        .pipe(
          map((productResponse: ProductResponse) => {
            return fetchProductSuccessAction({ productResponse: productResponse });}),
          catchError((error: Error) => of(fetchProductErrorAction({ error })))
        );
    })
  ));
}
