import { Actions } from '@ngrx/effects';
import { AuthenticatedUserResponse } from '../global-store/authenticated-user/response/authenticated-user.response';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gender } from '../../../shared/enums/gender';
import { Goal } from '../../../shared/enums/goal';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Lifestyle, LifestyleNumbers } from '../../../shared/enums/lifestyle';
import { MeasurementResponse } from '../global-store/measurement-store/response/measurement.response';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { fetchMeasurementAction } from '../global-store/measurement-store/queries/fetch-measurement/fetch-measurement.action';
import { fetchUserAction } from '../global-store/user-store/queries/fetch-user/fetch-user.action';
import { loginMeasurementAction } from './store/commands/login-measurement.action';
import { selectAuthenticatedUser } from '../global-store/authenticated-user/selectors/authenticated-user.selector';
import { selectMeasurement } from '../global-store/measurement-store/selectors/measurement.selector';
import { updateUserCaloriesAction } from '../global-store/user-store/commands/update-user-calories/update-user-calories.action';

@Component({
  selector: 'app-login-measurement',
  templateUrl: './login-measurement.component.html',
  styleUrls: ['./login-measurement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginMeasurementComponent implements OnDestroy {
  public loginMeasurementForm = this.formBuilder.group({
    weight: [60, Validators.required],
    neck: [40, Validators.required],
    chest: [90, Validators.required],
    stomach: [70, Validators.required],
    hips: [60, Validators.required],
    biceps: [40, Validators.required],
    calf: [40, Validators.required],
    waist: [90, Validators.required]
  });

  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  private authenticatedUser$ = this.store.select(selectAuthenticatedUser);
  private measurement$ = this.store.select(selectMeasurement);
  private authenticatedUser: AuthenticatedUserResponse = {
    id: 0,
    username: '',
    age: 0,
    height: 0,
    goal: '',
    lifestyle: '',
    gender: ''
  };
  private measurement: MeasurementResponse = {
    userId: 0,
    createdOn: new Date(1111, 11, 11),
    archivedOn: null!,
    weight: 0,
    id: 0,
  };
  private userCalories: number = 0;
  private activityUserCalories: number = 0;
  private goalUserCalories: number = 0;
  private destroy$ = new Subject<void>;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private actions$: Actions,
              private jwtHelperService: JwtHelperService) {
    this.authenticatedUser$.pipe(
      tap((user: AuthenticatedUserResponse) => this.authenticatedUser = user),
      takeUntil(this.destroy$)
    ).subscribe();

    this.measurement$.pipe(
      tap((measurement: MeasurementResponse) => this.measurement = measurement),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public onLoginMeasurementFormSubmit(): void {
    this.store.dispatch(loginMeasurementAction({
      measurement: {
        userId: this.decodedToken.id,
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
    this.store.dispatch(fetchUserAction({ id: this.decodedToken.id }));
    this.store.dispatch(fetchMeasurementAction({ id: this.decodedToken.id }));
    //TODO Look for bug with calories calculations
    this.store.dispatch(updateUserCaloriesAction({ updateUserCalories: {
      id: this.decodedToken.id,
      calories: this.getGoalUserCalories(this.getUserCalories())
    }
    }));
  };

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getUserCalories(): number {
    if (this.authenticatedUser.gender === Gender.MALE) {
      this.userCalories = (66 + (13.7 * this.loginMeasurementForm.value.weight!) + (5 * this.authenticatedUser.height) - (6.8 * this.authenticatedUser.age));

      if (this.authenticatedUser.lifestyle === Lifestyle.SEDENTARY) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.SEDENTARY;
      } else if (this.authenticatedUser.lifestyle === Lifestyle.LIGHTLY_ACTIVE) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.LIGHTLY_ACTIVE;
      } else if (this.authenticatedUser.lifestyle === Lifestyle.MODERATELY_ACTIVE) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.MODERATELY_ACTIVE;
      } else if (this.authenticatedUser.lifestyle === Lifestyle.VERY_ACTIVE) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.VERY_ACTIVE;
      } else {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.EXTRA_ACTIVE;
      }
    } else {
      this.userCalories = (665 + (9.6 * this.loginMeasurementForm.value.weight!) + (1.8 * this.authenticatedUser.height) - (4.7 * this.authenticatedUser.age));

      if (this.authenticatedUser.lifestyle === Lifestyle.SEDENTARY) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.SEDENTARY;
      } else if (this.authenticatedUser.lifestyle === Lifestyle.LIGHTLY_ACTIVE) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.LIGHTLY_ACTIVE;
      } else if (this.authenticatedUser.lifestyle === Lifestyle.MODERATELY_ACTIVE) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.MODERATELY_ACTIVE;
      } else if (this.authenticatedUser.lifestyle === Lifestyle.VERY_ACTIVE) {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.VERY_ACTIVE;
      } else {
        return this.activityUserCalories = this.userCalories * LifestyleNumbers.EXTRA_ACTIVE;
      }
    }
  }

  private getGoalUserCalories(userCalories: number): number {
    if (this.authenticatedUser.goal === Goal.LOSE) {
      return this.activityUserCalories - 300;
    } else if (this.authenticatedUser.goal === Goal.KEEP) {
      return this.activityUserCalories;
    } else {
      return this.activityUserCalories + 300;
    }
  }
}
