import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginMeasurementAction } from './store/commands/login-measurement.action';

@Component({
  selector: 'app-login-measurement',
  templateUrl: './login-measurement.component.html',
  styleUrls: ['./login-measurement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginMeasurementComponent {
  public loginMeasurementForm = this.formBuilder.group(({
    weight: [60, Validators.required],
    neck: [40, Validators.required],
    chest: [90, Validators.required],
    stomach: [70, Validators.required],
    hips: [60, Validators.required],
    biceps: [40, Validators.required],
    calf: [40, Validators.required],
    waist: [90, Validators.required]
  }));

  constructor(private formBuilder: FormBuilder,
              private store: Store) {
  }

  public onLoginMeasurementFormSubmit(): void {
    this.store.dispatch(loginMeasurementAction({
      measurement: {
        weight: this.loginMeasurementForm.value.weight!,
        neck: this.loginMeasurementForm.value.neck!,
        chest: this.loginMeasurementForm.value.chest!,
        stomach: this.loginMeasurementForm.value.stomach!,
        hips: this.loginMeasurementForm.value.hips!,
        biceps: this.loginMeasurementForm.value.biceps!,
        calf: this.loginMeasurementForm.value.calf!,
        waist: this.loginMeasurementForm.value.waist!,
      }
    }));
  };
}
