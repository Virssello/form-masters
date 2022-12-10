import { RecipeResponse } from '../../response/recipe.response';
import { createAction, props } from '@ngrx/store';

export const fetchRecipeAction = createAction(
  '[Recipe] Fetch Recipe Action',
  props<{ id: number }>()
);

export const fetchRecipeSuccessAction = createAction(
  '[Recipe] Fetch Recipe Success Action',
  props<{ recipeResponse: RecipeResponse }>()
);

export const fetchRecipeErrorAction = createAction(
  '[Recipe] Fetch Recipe Error Action',
  props<{ error: Error }>()
);
