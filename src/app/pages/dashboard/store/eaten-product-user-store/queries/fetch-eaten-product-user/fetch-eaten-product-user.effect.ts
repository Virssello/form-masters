import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EatenProductUserResponse } from '../../response/eaten-product-user.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { fetchEatenProductUserAction, fetchProductErrorAction, fetchProductSuccessAction } from './fetch-eaten-product-user.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchEatenProductUserEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fetchEatenProductUserAction),
    mergeMap(({ id }: { id: number }) => {
      return this.httpClient.get<EatenProductUserResponse>(`api/products/${id}`)
        .pipe(
          map((eatenProductUserResponse: EatenProductUserResponse) => {
            return fetchProductSuccessAction({ eatenProductUserResponse: eatenProductUserResponse });}),
          catchError((error: Error) => of(fetchProductErrorAction({ error })))
        );
    })
  ));
}
