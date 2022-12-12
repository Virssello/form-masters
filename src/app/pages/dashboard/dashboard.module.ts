import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { EATEN_PRODUCT_USER_STATE_FEATURE_KEY } from './store/eaten-product-user-store/eaten-product-user-state.selector';
import { EffectsModule } from '@ngrx/effects';
import { FetchEatenProductUserEffect } from './store/eaten-product-user-store/queries/fetch-eaten-product-user/fetch-eaten-product-user.effect';
import { FetchProductUserListEffect } from './store/product-user-store/queries/fetch-product-user-list/fetch-product-user-list.effect';
import { NgModule } from '@angular/core';
import { PRODUCT_USER_LIST_STATE_FEATURE_KEY } from './store/product-user-store/product-user-list-state.selector';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { eatenProductUserReducer } from './store/eaten-product-user-store/eaten-product-user.reducer';
import { productUserListReducer } from './store/product-user-store/product-user-list.reducer';

@NgModule({
  imports: [
    SharedModule,
    DashboardsRoutingModule,
    StoreModule.forFeature(PRODUCT_USER_LIST_STATE_FEATURE_KEY, productUserListReducer),
    StoreModule.forFeature(EATEN_PRODUCT_USER_STATE_FEATURE_KEY, eatenProductUserReducer),
    EffectsModule.forFeature([
      FetchProductUserListEffect,
      FetchEatenProductUserEffect
    ])
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
