import { AUTHENTICATED_USER_MEASUREMENT_STATE_FEATURE_KEY } from './authenticated-user-measurement/authenticated-user-measurement-state.selector';
import { AUTHENTICATED_USER_STATE_FEATURE_KEY } from './authenticated-user/authenticated-user-state.selector';
import { EffectsModule } from '@ngrx/effects';
import { FetchAuthenticatedUserEffect } from './authenticated-user/queries/fetch-authenticated-user/fetch-authenticated-user.effect';
import { FetchAuthenticatedUserMeasurementEffect } from './authenticated-user-measurement/queries/fetch-authenticated-user-measurement/fetch-authenticated-user-measurement.effect';
import { FetchMeasurementEffect } from './measurement-store/queries/fetch-measurement/fetch-measurement.effect';
import { FetchUserEffect } from './user-store/queries/fetch-user/fetch-user.effect';
import { MEASUREMENT_STATE_FEATURE_KEY } from './measurement-store/measurement-state.selector';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_STATE_FEATURE_KEY } from './user-store/user-state.selector';
import { UpdateUserCaloriesEffect } from './user-store/commands/update-user-calories/update-user-calories.effect';
import { authenticatedUserMeasurementReducer } from './authenticated-user-measurement/authenticated-user-measurement.reducer';
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
    StoreModule.forFeature(AUTHENTICATED_USER_MEASUREMENT_STATE_FEATURE_KEY, authenticatedUserMeasurementReducer),
    EffectsModule.forFeature([
      FetchAuthenticatedUserEffect,
      FetchAuthenticatedUserMeasurementEffect,
      FetchUserEffect,
      FetchMeasurementEffect,
      UpdateUserCaloriesEffect
    ])
  ]
})
export class GlobalStoreModule { }
