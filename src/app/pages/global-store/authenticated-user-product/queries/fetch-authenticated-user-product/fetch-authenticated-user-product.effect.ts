import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticatedUserProductResponse } from '../../response/authenticated-user-product.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { fetchAuthenticatedUserProductAction, fetchAuthenticatedUserProductErrorAction, fetchAuthenticatedUserProductSuccessAction } from './fetch-authenticated-user-product.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchAuthenticatedUserProductEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedUserProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAuthenticatedUserProductAction),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<AuthenticatedUserProductResponse>(`api/products/product-user/${id}`)
        .pipe(
          map((authenticatedUserProduct: AuthenticatedUserProductResponse) => {
            return fetchAuthenticatedUserProductSuccessAction({ authenticatedUserProduct: authenticatedUserProduct });}),
          catchError((error: Error) => of(fetchAuthenticatedUserProductErrorAction({ error })))
        );
    })
  ));
}
