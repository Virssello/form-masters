import { EffectsModule } from '@ngrx/effects';
import { FetchRecipeEffect } from './recipe-store/queries/fetch-recipe/fetch-recipe.effect';
import { FetchRecipeListEffect } from './recipes-list-store/queries/fetch-recipe-list/fetch-recipe-list.effect';
import { NgModule } from '@angular/core';
import { RECIPE_LIST_STATE_FEATURE_KEY } from './recipes-list-store/recipe-list-state.selector';
import { RECIPE_STATE_FEATURE_KEY } from './recipe-store/recipe-state.selector';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeListReducer } from './recipes-list-store/recipe-list.reducer';
import { recipeReducer } from './recipe-store/recipe.reducer';

@NgModule({
  imports: [
    SharedModule,
    RecipesRoutingModule,
    StoreModule.forFeature(RECIPE_LIST_STATE_FEATURE_KEY, recipeListReducer),
    StoreModule.forFeature(RECIPE_STATE_FEATURE_KEY, recipeReducer),
    EffectsModule.forFeature([
      FetchRecipeEffect,
      FetchRecipeListEffect
    ])
  ],
  declarations: [RecipesComponent]
})
export class RecipesModule { }
