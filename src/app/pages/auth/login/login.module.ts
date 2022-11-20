import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { UserLoginEffect } from './store/commands/user-login.effect';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    EffectsModule.forFeature([
      UserLoginEffect
    ])
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
