import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterArchivedOnPipe } from './pipes/filter-archived-on.pipe';
import { FilterCurrentDatePipe } from './pipes/filter-current-date.pipe';
import { LOADING_STATE_FEATURE_KEY } from './store-services/set-loading/set-loading-state.selector';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UiModule } from './ui-module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { loadingReducer } from './store-services/set-loading/set-loading.reducer';

@NgModule({
  imports: [
    UiModule,
    RouterLinkWithHref,
    StoreModule.forFeature(LOADING_STATE_FEATURE_KEY, loadingReducer)
  ],
  exports: [
    UiModule,
    WrapperComponent,
    FilterArchivedOnPipe,
    FilterCurrentDatePipe,
    LoadingSpinnerComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  declarations: [
    WrapperComponent,
    FilterArchivedOnPipe,
    FilterCurrentDatePipe,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}
