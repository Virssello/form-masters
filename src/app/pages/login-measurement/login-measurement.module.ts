import { EffectsModule } from '@ngrx/effects';
import { LoginMeasurementComponent } from './login-measurement.component';
import { LoginMeasurementEffect } from './store/commands/login-measurement.effect';
import { LoginMeasurementRoutingModule } from './login-measurement-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    LoginMeasurementComponent
  ],
  imports: [
    SharedModule,
    LoginMeasurementRoutingModule,
    EffectsModule.forFeature([
      LoginMeasurementEffect
    ])
  ],
  exports: [
    LoginMeasurementComponent
  ]
})
export class LoginMeasurementModule { }
