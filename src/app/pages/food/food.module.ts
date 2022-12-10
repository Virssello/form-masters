import { EffectsModule } from '@ngrx/effects';
import { FetchRecipeListEffect } from './recipes/recipes-list-store/queries/fetch-recipe-list/fetch-recipe-list.effect';
import { FoodRoutingModule } from './food-routing.module';
import { NgModule } from '@angular/core';
import { RECIPE_LIST_STATE_FEATURE_KEY } from './recipes/recipes-list-store/recipe-list-state.selector';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeListReducer } from './recipes/recipes-list-store/recipe-list.reducer';

@NgModule({
  imports: [
    SharedModule,
    FoodRoutingModule,
    StoreModule.forFeature(RECIPE_LIST_STATE_FEATURE_KEY, recipeListReducer),
    EffectsModule.forFeature([
      FetchRecipeListEffect
    ])]
})
export class FoodModule { }
