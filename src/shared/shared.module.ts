import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterArchivedOnPipe } from './pipes/filter-archived-on.pipe';
import { LOADING_STATE_FEATURE_KEY } from './services/set-loading/set-loading-state.selector';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UiModule } from './ui-module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { loadingReducer } from './services/set-loading/set-loading.reducer';

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
    LoadingSpinnerComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  declarations: [
    WrapperComponent,
    FilterArchivedOnPipe,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}
