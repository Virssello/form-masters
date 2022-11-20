import { EffectsModule } from '@ngrx/effects';
import { FormBuilder } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { UserSignUpEffect } from './store/commands/user-sign-up.effect';

@NgModule({
  imports: [
    SignUpRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      UserSignUpEffect
    ])
  ],
  providers: [FormBuilder],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
