import { RecipeListResponse } from '../../response/recipe-list.response';
import { createAction, props } from '@ngrx/store';

export const fetchRecipeListAction = createAction(
  '[Recipe] Fetch Recipe List Action'
);

export const fetchRecipeListSuccessAction = createAction(
  '[Recipe] Fetch Recipe List Success Action',
  props<{ recipeListResponse: RecipeListResponse[] }>()
);

export const fetchRecipeListErrorAction = createAction(
  '[Recipe] Fetch Recipe List Error Action',
  props<{ error: Error }>()
);
