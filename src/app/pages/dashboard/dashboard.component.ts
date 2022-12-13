import { AuthenticatedUserResponse } from '../global-store/authenticated-user/response/authenticated-user.response';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { Observable, Subject, Subscription, take, takeLast, takeUntil } from 'rxjs';
import { ProductUserListResponse } from './store/product-user-store/response/product-user-list.response';
import { Store } from '@ngrx/store';
import { fetchProductUserListAction } from './store/product-user-store/queries/fetch-product-user-list/fetch-product-user-list.action';
import { fetchUserAction } from '../global-store/user-store/queries/fetch-user/fetch-user.action';
import { map } from 'rxjs/operators';
import { selectAuthenticatedUser } from '../global-store/authenticated-user/selectors/authenticated-user.selector';
import { selectProductUserList } from './store/product-user-store/selectors/product-user-list.selector';

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
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0
  };

  public productsUser$: Observable<ProductUserListResponse[]> = this.store.select(selectProductUserList);

  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  private destroy$ = new Subject<void>;
  private subscription: Subscription;

  constructor(public layoutService: LayoutService,
              private store: Store,
              private jwtHelperService: JwtHelperService) {
    this.store.dispatch(fetchUserAction({ id: this.decodedToken.id }));

    this.store.dispatch(fetchProductUserListAction({ id: this.decodedToken.id }));

    this.productsUser$.pipe(
      take(2),
      takeLast(1),
      map((productsUser: ProductUserListResponse[]) => {
        productsUser.forEach((productUser: ProductUserListResponse) => {
          this.currentlyEatenMacronutrients.calories += productUser.product.calories;
          this.currentlyEatenMacronutrients.protein += productUser.product.protein;
          this.currentlyEatenMacronutrients.carbohydrates += productUser.product.carbohydrate;
          this.currentlyEatenMacronutrients.fat += productUser.product.fat;
        });
      }),
      takeUntil(this.destroy$)
    ).subscribe();

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
