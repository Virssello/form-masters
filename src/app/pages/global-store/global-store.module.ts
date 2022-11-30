import { AUTHENTICATED_USER_STATE_FEATURE_KEY } from './authenticated-user/authenticated-user-state.selector';
import { EffectsModule } from '@ngrx/effects';
import { FetchAuthenticatedUserEffect } from './authenticated-user/queries/fetch-authenticated-user/fetch-authenticated-user.effect';
import { FetchMeasurementEffect } from './measurement-store/queries/fetch-measurement/fetch-measurement.effect';
import { FetchUserEffect } from './user-store/queries/fetch-user/fetch-user.effect';
import { MEASUREMENT_STATE_FEATURE_KEY } from './measurement-store/measurement-state.selector';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_STATE_FEATURE_KEY } from './user-store/user-state.selector';
import { authenticatedUserReducer } from './authenticated-user/authenticated-user.reducer';
import { measurementReducer } from './measurement-store/measurement.reducer';
import { userReducer } from './user-store/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreModule.forFeature(USER_STATE_FEATURE_KEY, userReducer),
    StoreModule.forFeature(MEASUREMENT_STATE_FEATURE_KEY, measurementReducer),
    StoreModule.forFeature(AUTHENTICATED_USER_STATE_FEATURE_KEY, authenticatedUserReducer),
    EffectsModule.forFeature([
      FetchAuthenticatedUserEffect,
      FetchUserEffect,
      FetchMeasurementEffect
    ])
  ]
})
export class GlobalStoreModule { }
