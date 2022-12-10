import { RecipeListState } from './recipe-list-state';
import { createFeatureSelector } from '@ngrx/store';

export const RECIPE_LIST_STATE_FEATURE_KEY = 'recipe-list-state-feature-key';

export const selectRecipeListState = createFeatureSelector<RecipeListState>(RECIPE_LIST_STATE_FEATURE_KEY);
