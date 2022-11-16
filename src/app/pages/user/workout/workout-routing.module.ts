import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: WorkoutComponent }
  ])],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
