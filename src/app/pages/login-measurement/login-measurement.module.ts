import { EffectsModule } from '@ngrx/effects';
import { FetchMeasurementEffect } from './store/measurement-store/fetch-measurement/queries/fetch-measurement.effect';
import { FetchUserEffect } from './store/user-store/queries/fetch-user/fetch-user.effect';
import { LoginMeasurementComponent } from './login-measurement.component';
import { LoginMeasurementEffect } from './store/login-measurement/commands/login-measurement.effect';
import { LoginMeasurementRoutingModule } from './login-measurement-routing.module';
import { MEASUREMENT_STATE_FEATURE_KEY } from './store/measurement-store/measurement-state.selector';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_STATE_FEATURE_KEY } from './store/user-store/user-state.selector';
import { UpdateUserCaloriesEffect } from './store/user-store/commands/update-user-calories/update-user-calories.effect';
import { measurementReducer } from './store/measurement-store/measurement.reducer';
import { userReducer } from './store/user-store/user.reducer';

@NgModule({
  declarations: [
    LoginMeasurementComponent
  ],
  imports: [
    SharedModule,
    LoginMeasurementRoutingModule,
    StoreModule.forFeature(MEASUREMENT_STATE_FEATURE_KEY, measurementReducer),
    StoreModule.forFeature(USER_STATE_FEATURE_KEY, userReducer),
    EffectsModule.forFeature([
      LoginMeasurementEffect,
      FetchMeasurementEffect,
      FetchUserEffect,
      UpdateUserCaloriesEffect
    ])
  ],
  exports: [
    LoginMeasurementComponent
  ]
})
export class LoginMeasurementModule { }
