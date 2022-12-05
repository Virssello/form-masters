import { RecipeState } from '../recipe-state';
import { createSelector } from '@ngrx/store';
import { selectRecipeState } from '../recipe-state.selector';

export const selectRecipe = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.recipeResponse
);
