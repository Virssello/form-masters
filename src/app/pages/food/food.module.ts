import { FoodRoutingModule } from './food-routing.module';
import { NgModule } from '@angular/core';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FoodRoutingModule,
    RecipesModule
  ]
})
export class FoodModule { }
