import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: LandingComponent }
  ])],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
