import { AddProductUserEffect } from './store/product-user-store/commands/add-product-user/add-product-user.effect';
import { EffectsModule } from '@ngrx/effects';
import { FetchProductEffect } from './store/product-store/queries/fetch-product/fetch-product.effect';
import { FetchProductListEffect } from './store/product-list-store/queries/fetch-product-list/fetch-product-list.effect';
import { NgModule } from '@angular/core';
import { PRODUCT_LIST_STATE_FEATURE_KEY } from './store/product-list-store/product-list-state.selector';
import { PRODUCT_STATE_FEATURE_KEY } from './store/product-store/product-state.selector';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { productListReducer } from './store/product-list-store/product-list.reducer';
import { productReducer } from './store/product-store/product.reducer';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature(PRODUCT_LIST_STATE_FEATURE_KEY, productListReducer),
    StoreModule.forFeature(PRODUCT_STATE_FEATURE_KEY, productReducer),
    EffectsModule.forFeature([
      FetchProductListEffect,
      FetchProductEffect,
      AddProductUserEffect
    ])
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
