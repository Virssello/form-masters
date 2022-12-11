import { CreateWorkoutEffect } from './workout-store/commands/create-workout/create-workout.effect';
import { EffectsModule } from '@ngrx/effects';
import { FetchWorkoutEffect } from './workout-store/queries/fetch-workout/fetch-workout.effect';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { WORKOUT_STATE_FEATURE_KEY } from './workout-store/workout-state.selector';
import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { workoutReducer } from './workout-store/workout.reducer';

@NgModule({
  imports: [
    SharedModule,
    WorkoutRoutingModule,
    StoreModule.forFeature(WORKOUT_STATE_FEATURE_KEY, workoutReducer),
    EffectsModule.forFeature([
      FetchWorkoutEffect,
      CreateWorkoutEffect
    ])
  ],
  declarations: [WorkoutComponent]
})
export class WorkoutModule { }
