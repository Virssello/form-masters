import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { Store } from '@ngrx/store';
import { userLoginAction } from './store/commands/user-login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public userLoginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public layoutService: LayoutService,
              private store: Store,
              private formBuilder: FormBuilder) {}

  public onUserLoginSubmit(): void {
    this.store.dispatch(userLoginAction({
      user: {
        username: this.userLoginForm.value.username!,
        password: this.userLoginForm.value.password!
      }
    }));
  }
}
