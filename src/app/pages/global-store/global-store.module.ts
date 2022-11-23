import { EffectsModule } from '@ngrx/effects';
import { FetchUserEffect } from './user-store/queries/fetch-authenticated-user/fetch-user.effect';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_STATE_FEATURE_KEY } from './user-store/user-state.selector';
import { userReducer } from './user-store/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreModule.forFeature(USER_STATE_FEATURE_KEY, userReducer),
    EffectsModule.forFeature([
      FetchUserEffect
    ])
  ]
})
export class GlobalStoreModule { }
