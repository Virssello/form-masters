import { RecipeListState } from '../recipe-list-state';
import { createSelector } from '@ngrx/store';
import { selectRecipeListState } from '../recipe-list-state.selector';

export const selectRecipeList = createSelector(
  selectRecipeListState,
  (state: RecipeListState) => state.recipeListResponse
);
