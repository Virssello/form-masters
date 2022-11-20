import { ConfirmationService, MessageService } from 'primeng/api';
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
    WrapperComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  declarations: [
    WrapperComponent
  ]
})
export class SharedModule {}
