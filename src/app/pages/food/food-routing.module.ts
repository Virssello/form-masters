import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'products', loadChildren: () => import('./products/products.module').then(({ ProductsModule }: any) => ProductsModule) },
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(({ RecipesModule }: any) => RecipesModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
