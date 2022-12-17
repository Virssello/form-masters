import { Actions, ofType } from '@ngrx/effects';


import { AuthenticatedUserResponse } from './store/authenticated-user-store/response/authenticated-user.response';
import { ChangeDetectionStrategy, Component, NgZone, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { Observable, Subject, Subscription, filter, take, takeLast, takeUntil, tap } from 'rxjs';
import { ProductUserListResponse } from './store/product-user-store/response/product-user-list.response';
import { Store } from '@ngrx/store';
import { UserMeasurementListResponse } from '../user/measurement/store/user-measurement-list-store/response/user-measurement-list.response';
import {
  archiveProductUserAction,
  archiveProductUserSuccessAction
} from './store/product-user-store/commands/archive-product-user/archive-product-user.action';
import { fetchAuthenticatedUserAction } from './store/authenticated-user-store/queries/fetch-authenticated-user.action';
import { fetchProductUserListAction } from './store/product-user-store/queries/fetch-product-user-list/fetch-product-user-list.action';
import { fetchUserMeasurementListAction } from '../user/measurement/store/user-measurement-list-store/queries/fetch-user-measurement-list/fetch-user-measurement-list.action';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { selectAuthenticatedUser } from './store/authenticated-user-store/selectors/authenticated-user.selector';
import { selectProductUserList } from './store/product-user-store/selectors/product-user-list.selector';
import { selectUserMeasurementList } from '../user/measurement/store/user-measurement-list-store/selectors/user-measurement-list.selector';

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
export class DashboardComponent implements OnDestroy {
  public authenticatedUser$: Observable<AuthenticatedUserResponse> = this.store.select(selectAuthenticatedUser);
  public userMeasurements$: Observable<UserMeasurementListResponse[]> = this.store.select(selectUserMeasurementList);
  public productsUser$: Observable<ProductUserListResponse[]> = this.store.select(selectProductUserList);
  public productsUser: ProductUserListResponse[] = [];
  public userCalories: number = parseInt(localStorage.getItem('userCalories')!);

  public currentlyEatenMacronutrients: Macronutrients = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0
  };
  public chartData: any;
  public chartOptions: any;

  private destroy$ = new Subject<void>;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  private subscription: Subscription;
  private chartWeightData: number[] = [];
  private chartCreatedAtLabels: string[] = [];
  private format = 'dd/MM/yy';
  private locale = 'en-US';
  private currentDate = formatDate(Date.now(), this.format, this.locale);

  constructor(public layoutService: LayoutService,
              private store: Store,
              private actions$: Actions,
              private jwtHelperService: JwtHelperService,
              private ngZone: NgZone) {
    this.actions$.pipe(
      ofType(archiveProductUserSuccessAction),
      tap(() => this.store.dispatch(fetchProductUserListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.store.dispatch(fetchAuthenticatedUserAction());

    this.store.dispatch(fetchProductUserListAction({ id: this.decodedToken.id }));

    this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }));

    this.productsUser$.pipe(
      take(2),
      takeLast(1),
      map((productsUser: ProductUserListResponse[]) => {
        productsUser.forEach((productUser: ProductUserListResponse) => {
          if (formatDate(productUser.createdOn, this.format, this.locale) === this.currentDate && productUser.archivedOn === null) {
            this.productsUser.push(productUser);
            this.currentlyEatenMacronutrients.calories! += (productUser.product.calories * productUser.weight);
            this.currentlyEatenMacronutrients.protein += (productUser.product.protein * productUser.weight);
            this.currentlyEatenMacronutrients.carbohydrates += (productUser.product.carbohydrate * productUser.weight);
            this.currentlyEatenMacronutrients.fat += (productUser.product.fat * productUser.weight);
          }
        });
      }),
      takeUntil(this.destroy$)
    ).subscribe();


    this.userMeasurements$.pipe(
      filter((userMeasurement: UserMeasurementListResponse[]) => Boolean(userMeasurement)),
      tap((userMeasurements: UserMeasurementListResponse[]) => this.ngZone.run(
        () => {
          const filteredUserMeasurement = userMeasurements.filter((userMeasurements: UserMeasurementListResponse) => userMeasurements.archivedOn === null);

          filteredUserMeasurement.forEach((userMeasurement: UserMeasurementListResponse) => {
            this.chartWeightData.push(userMeasurement.weight);
            this.chartCreatedAtLabels.push(formatDate(userMeasurement.createdOn, this.format, this.locale)).toString();
          });
        }
      )),
      takeUntil(this.destroy$)
    ).subscribe();

    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
      this.initChart();
    });

    this.initChart();
  }

  public deleteProductUser(product: ProductUserListResponse): void {
    this.store.dispatch(archiveProductUserAction({ archiveProductUser: {
      id: product.id,
      archivedOn: new Date()
    }
    }));
    this.currentlyEatenMacronutrients.calories -= (product.product.calories * product.weight);
    this.currentlyEatenMacronutrients.protein -= (product.product.protein * product.weight);
    this.currentlyEatenMacronutrients.carbohydrates -= (product.product.carbohydrate * product.weight);
    this.currentlyEatenMacronutrients.fat -= (product.product.fat * product.weight);
  }

  public initChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: this.chartCreatedAtLabels,
      datasets: [
        {
          label: 'Weight',
          data: this.chartWeightData,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
      ]
    };

    this.chartOptions = {
      layout: {
        padding: 30
      },
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      elements: {
        point: {
          pointRadius: 5,
          pointBorderWidth: 5
        }
      },
      scales: {
        x: {
          reverse: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
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
