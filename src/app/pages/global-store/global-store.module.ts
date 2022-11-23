import { EffectsModule } from '@ngrx/effects';
import { FetchMeasurementEffect } from './measurement-store/queries/fetch-measurement/fetch-measurement.effect';
import { FetchUserEffect } from './user-store/queries/fetch-user/fetch-user.effect';
import { MEASUREMENT_STATE_FEATURE_KEY } from './measurement-store/measurement-state.selector';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_STATE_FEATURE_KEY } from './user-store/user-state.selector';
import { measurementReducer } from './measurement-store/measurement.reducer';
import { userReducer } from './user-store/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreModule.forFeature(USER_STATE_FEATURE_KEY, userReducer),
    StoreModule.forFeature(MEASUREMENT_STATE_FEATURE_KEY, measurementReducer),
    EffectsModule.forFeature([
      FetchUserEffect,
      FetchMeasurementEffect
    ])
  ]
})
export class GlobalStoreModule { }
