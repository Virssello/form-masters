import { AuthenticatedUserResponse } from '../global-store/authenticated-user/response/authenticated-user.response';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchUserAction } from '../global-store/user-store/queries/fetch-user/fetch-user.action';
import { selectAuthenticatedUser } from '../global-store/authenticated-user/selectors/authenticated-user.selector';

export type Macronutrients = {
  calories: number,
  protein: number,
  carbohydrates: number,
  fat: number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  public chartData: any;
  public chartOptions: any;
  public authenticatedUser$: Observable<AuthenticatedUserResponse> = this.store.select(selectAuthenticatedUser);
  public userCalories: number = parseInt(localStorage.getItem('userCalories')!);
  public userMacronutrients: Macronutrients = {
    calories: this.userCalories,
    protein: this.userCalories * 0.45,
    carbohydrates: this.userCalories * 0.35,
    fat: this.userCalories * 0.20,
  };

  public currentlyEatenMacronutrients: Macronutrients = {
    calories: 100,
    protein: 100,
    carbohydrates: 200,
    fat: 300
  };

  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  private destroy$ = new Subject<void>;
  private subscription: Subscription;

  constructor(public layoutService: LayoutService,
              private store: Store,
              private jwtHelperService: JwtHelperService) {
    this.store.dispatch(fetchUserAction({ id: this.decodedToken.id }));

    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
      this.initChart();
    });
  }

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Weight',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
