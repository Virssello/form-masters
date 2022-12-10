import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  declarations: [RecipesComponent]
})
export class RecipesModule { }
