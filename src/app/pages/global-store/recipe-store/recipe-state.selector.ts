import { RecipeState } from './recipe-state';
import { createFeatureSelector } from '@ngrx/store';

export const RECIPE_STATE_FEATURE_KEY = 'recipe-state-feature-key';

export const selectRecipeState = createFeatureSelector<RecipeState>(RECIPE_STATE_FEATURE_KEY);
