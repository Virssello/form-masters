import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { Store } from '@ngrx/store';
import { userSignUpAction } from './store/commands/user-sign-up.action';

@Component({
  selector: 'app-login',
  templateUrl: './sign-up.component.html',
  styleUrls:['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  public userRegisterForm = this.formBuilder.group(({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }));

  constructor(public layoutService: LayoutService,
              private store: Store,
              private formBuilder: FormBuilder) {
  }

  public onUserSignUpSubmit(): void {
    this.store.dispatch(userSignUpAction({
      user: {
        username: this.userRegisterForm.value.username!,
        password: this.userRegisterForm.value.password!
      }
    }));
  }
}
