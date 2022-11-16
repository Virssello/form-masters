import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'measurements', loadChildren: (): any => import('./measurement/measurement.module').then(({ MeasurementModule }: any) => MeasurementModule) },
    { path: 'workouts', loadChildren: (): any => import('./workout/workout.module').then(({ WorkoutModule }: any) => WorkoutModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class UserRoutingModule { }
