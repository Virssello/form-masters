import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeListResponse } from '../../response/recipe-list.response';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { fetchRecipeListAction, fetchRecipeListErrorAction, fetchRecipeListSuccessAction } from './fetch-recipe-list.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchRecipeListEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public recipeListEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRecipeListAction),
    debounceTime(2000),
    switchMap(() => {
      return this.httpClient.get<RecipeListResponse[]>('api/recipes')
        .pipe(
          map((recipeListResponse: RecipeListResponse[]) => {
            return fetchRecipeListSuccessAction({ recipeListResponse: recipeListResponse });}),
          catchError((error: Error) => of(fetchRecipeListErrorAction({ error })))
        );
    })
  ));
}
