import { AddMeasurementEffect } from './store/user-measurement-list-store/commands/add-measurement/add-measurement.effect';
import { ArchiveMeasurementEffect } from './store/user-measurement-list-store/commands/archive-measurement/archive-measurement.effect';
import { EffectsModule } from '@ngrx/effects';
import { FetchUserMeasurementListEffect } from './store/user-measurement-list-store/queries/fetch-user-measurement-list/fetch-user-measurement-list.effect';
import { MeasurementComponent } from './measurement.component';
import { MeasurementRoutingModule } from './measurement-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { USER_MEASUREMENT_LIST_STATE_FEATURE_KEY } from './store/user-measurement-list-store/user-measurement-list-state.selector';
import { UpdateMeasurementEffect } from './store/user-measurement-list-store/commands/update-measurement/update-measurement.effect';
import { userMeasurementListReducer } from './store/user-measurement-list-store/user-measurement-list.reducer';

@NgModule({
  imports: [
    SharedModule,
    MeasurementRoutingModule,
    StoreModule.forFeature(USER_MEASUREMENT_LIST_STATE_FEATURE_KEY, userMeasurementListReducer),
    EffectsModule.forFeature([
      FetchUserMeasurementListEffect,
      AddMeasurementEffect,
      ArchiveMeasurementEffect,
      UpdateMeasurementEffect
    ]),
  ],
  declarations: [MeasurementComponent]
})
export class MeasurementModule { }
