import { AUTHENTICATED_USER_STATE_FEATURE_KEY } from './store/authenticated-user-store/authenticated-user-state.selector';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { FetchAuthenticatedUserEffect } from './store/authenticated-user-store/queries/fetch-authenticated-user.effect';
import { FetchProductUserListEffect } from './store/product-user-store/queries/fetch-product-user-list/fetch-product-user-list.effect';
import { NgModule } from '@angular/core';
import { PRODUCT_USER_LIST_STATE_FEATURE_KEY } from './store/product-user-store/product-user-list-state.selector';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { authenticatedUserReducer } from './store/authenticated-user-store/authenticated-user.reducer';
import { productUserListReducer } from './store/product-user-store/product-user-list.reducer';

@NgModule({
  imports: [
    SharedModule,
    DashboardsRoutingModule,
    StoreModule.forFeature(AUTHENTICATED_USER_STATE_FEATURE_KEY, authenticatedUserReducer),
    StoreModule.forFeature(PRODUCT_USER_LIST_STATE_FEATURE_KEY, productUserListReducer),
    EffectsModule.forFeature([
      FetchProductUserListEffect,
      FetchAuthenticatedUserEffect,
    ])
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
