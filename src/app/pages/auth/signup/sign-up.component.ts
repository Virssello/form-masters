import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender } from '../../../../shared/enums/gender';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { Store } from '@ngrx/store';
import { userSignUpAction } from './store/commands/user-sign-up.action';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls:['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  public genderOptions: any[] = [
    { label: 'Male', value: Gender.MALE },
    { label: 'Female', value: Gender.FEMALE }
  ];

  public userRegisterForm = this.formBuilder.group(({
    username: ['', Validators.required],
    password: ['', Validators.required],
    gender:[this.genderOptions[0].value, Validators.required],
    age:[18, Validators.required]
  }));

  constructor(public layoutService: LayoutService,
              private store: Store,
              private formBuilder: FormBuilder) {
  }

  public onUserSignUpSubmit(): void {
    this.store.dispatch(userSignUpAction({
      user: {
        username: this.userRegisterForm.value.username!,
        password: this.userRegisterForm.value.password!,
        gender: this.userRegisterForm.value.gender!,
        age: this.userRegisterForm.value.age!,
        calories: null!
      }
    }));
  }
}
