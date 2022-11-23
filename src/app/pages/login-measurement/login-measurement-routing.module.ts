import { LoginMeasurementComponent } from './login-measurement.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: LoginMeasurementComponent }
  ])],
  exports: [RouterModule]
})
export class LoginMeasurementRoutingModule { }
