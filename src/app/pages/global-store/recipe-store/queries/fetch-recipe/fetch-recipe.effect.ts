import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeResponse } from '../../response/recipe.response';
import { catchError, of, switchMap } from 'rxjs';
import { fetchRecipeAction, fetchRecipeErrorAction, fetchRecipeSuccessAction } from './fetch-recipe.action';
import { map } from 'rxjs/operators';

@Injectable()
export class FetchRecipeEffect {
  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}

  public authenticatedRecipe$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRecipeAction),
    switchMap(({ id }: { id: number }) => {
      return this.httpClient.get<RecipeResponse>(`api/recipes/${id}`)
        .pipe(
          map((recipeResponse: RecipeResponse) => {
            return fetchRecipeSuccessAction({ recipeResponse: recipeResponse });}),
          catchError((error: Error) => of(fetchRecipeErrorAction({ error })))
        );
    })
  ));
}
