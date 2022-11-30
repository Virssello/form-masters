import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender } from '../../../../shared/enums/gender';
import { Goal } from '../../../../shared/enums/goal';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { Lifestyle } from '../../../../shared/enums/lifestyle';
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

  public goalOptions: any[] = [
    { label: 'Lose', value: Goal.LOSE },
    { label: 'Keep', value: Goal.KEEP },
    { label: 'Gain', value: Goal.GAIN }
  ];

  public lifestyleOptions: any[] = [
    /*    { label: 'Sedentary', value: Lifestyle.SEDENTARY },*/
    { label: 'Lightly active', value: Lifestyle.LIGHTLY_ACTIVE },
    { label: 'Moderately active', value: Lifestyle.MODERATELY_ACTIVE },
    { label: 'Very active', value: Lifestyle.VERY_ACTIVE },
    { label: 'Extra active', value: Lifestyle.EXTRA_ACTIVE },
  ];

  public userRegisterForm = this.formBuilder.group(({
    username: ['', Validators.required],
    password: ['', Validators.required],
    gender: [this.genderOptions[0].value, Validators.required],
    age: [18, Validators.required],
    height: [170, Validators.required],
    goal: [this.goalOptions[1].value, Validators.required],
    lifestyle: [this.lifestyleOptions[0].value, Validators.required]
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
        height: this.userRegisterForm.value.height!,
        goal: this.userRegisterForm.value.goal!,
        lifestyle: this.userRegisterForm.value.lifestyle!,
        calories: null!
      }
    }));
  }
}
