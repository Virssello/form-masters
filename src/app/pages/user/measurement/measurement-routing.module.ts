import { MeasurementComponent } from './measurement.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MeasurementComponent }
  ])],
  exports: [RouterModule]
})
export class MeasurementRoutingModule { }
