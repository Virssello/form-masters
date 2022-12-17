import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterArchivedOnPipe } from './pipes/filter-archived-on.pipe';
import { FilterNotNullPipe } from './pipes/filter-not-null.pipe';
import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { UiModule } from './ui-module';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  imports: [
    UiModule,
    RouterLinkWithHref,
  ],
  exports: [
    UiModule,
    WrapperComponent,
    FilterArchivedOnPipe,
    FilterNotNullPipe
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  declarations: [
    WrapperComponent,
    FilterArchivedOnPipe,
    FilterNotNullPipe
  ]
})
export class SharedModule {}
