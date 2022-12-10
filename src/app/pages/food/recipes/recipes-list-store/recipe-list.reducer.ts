import { RecipeListResponse } from './response/recipe-list.response';
import { RecipeListState } from './recipe-list-state';
import { createReducer, on } from '@ngrx/store';
import { fetchRecipeListSuccessAction } from './queries/fetch-recipe-list/fetch-recipe-list.action';

export const recipeListInitialState: RecipeListState = {
  recipeListResponse: [{
    id: 0,
    name: '',
    type: '',
    calories: 0,
    photo: '',
    ingredients: '',
    description: ''
  }]
};

export const recipeListReducer = createReducer(
  recipeListInitialState,
  on(fetchRecipeListSuccessAction, (state: RecipeListState, { recipeListResponse }: { recipeListResponse: RecipeListResponse[] }) => ({
    ...state,
    recipeListResponse: recipeListResponse
  }))
);
