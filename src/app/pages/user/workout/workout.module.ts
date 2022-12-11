import { CreateWorkoutEffect } from './workout-store/commands/create-workout/create-workout.effect';
import { EffectsModule } from '@ngrx/effects';
import { FetchUserWorkoutListEffect } from './user-workout-list-store/queries/fetch-user-workout-list/fetch-user-workout-list.effect';
import { FetchWorkoutEffect } from './workout-store/queries/fetch-workout/fetch-workout.effect';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_WORKOUT_LIST_STATE_FEATURE_KEY } from './user-workout-list-store/user-workout-list-state.selector';
import { WORKOUT_STATE_FEATURE_KEY } from './workout-store/workout-state.selector';
import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { userWorkoutListReducer } from './user-workout-list-store/user-workout-list.reducer';
import { workoutReducer } from './workout-store/workout.reducer';

@NgModule({
  imports: [
    SharedModule,
    WorkoutRoutingModule,
    StoreModule.forFeature(WORKOUT_STATE_FEATURE_KEY, workoutReducer),
    StoreModule.forFeature(USER_WORKOUT_LIST_STATE_FEATURE_KEY, userWorkoutListReducer),
    EffectsModule.forFeature([
      FetchUserWorkoutListEffect,
      FetchWorkoutEffect,
      CreateWorkoutEffect
    ])
  ],
  declarations: [WorkoutComponent]
})
export class WorkoutModule { }
