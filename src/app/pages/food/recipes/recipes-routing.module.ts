import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RecipesComponent }
  ])],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
