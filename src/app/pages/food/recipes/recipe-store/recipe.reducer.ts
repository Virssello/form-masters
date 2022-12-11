import { RecipeResponse } from './response/recipe.response';
import { RecipeState } from './recipe-state';
import { createReducer, on } from '@ngrx/store';
import { fetchRecipeSuccessAction } from './queries/fetch-recipe/fetch-recipe.action';

export const recipeInitialState: RecipeState = {
  recipeResponse: {
    id: 0,
    name: '',
    type: '',
    calories: 0,
    photo: '',
    ingredients: [''],
    description: ''
  }
};

export const recipeReducer = createReducer(
  recipeInitialState,
  on(fetchRecipeSuccessAction, (state: RecipeState, { recipeResponse: recipeResponse }: { recipeResponse: RecipeResponse }) => ({
    ...state,
    recipeResponse: recipeResponse
  }))
);
