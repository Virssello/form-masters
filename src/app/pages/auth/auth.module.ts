import { AUTHENTICATED_USER_STATE_FEATURE_KEY } from './store/authenticated-user-state.selector';
import { AuthRoutingModule } from './auth-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { FetchAuthenticatedUserEffect } from './store/queries/fetch-authenticated-user/fetch-authenticated-user.effect';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { authenticatedUserReducer } from './store/authenticated-user.reducer';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(AUTHENTICATED_USER_STATE_FEATURE_KEY, authenticatedUserReducer),
    EffectsModule.forFeature([
      FetchAuthenticatedUserEffect
    ])
  ]
})
export class AuthModule { }
