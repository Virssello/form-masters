import { Actions, ofType } from '@ngrx/effects';
import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  NgZone, OnChanges,
  OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import { AuthenticatedUserResponse } from './store/authenticated-user-store/response/authenticated-user.response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../layout/service/app.layout.service';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  filter,
  take,
  takeLast,
  takeUntil,
  tap
} from 'rxjs';
import { ProductUserListResponse } from './store/product-user-store/response/product-user-list.response';
import { Store } from '@ngrx/store';
import { UserMeasurementListResponse } from '../user/measurement/store/user-measurement-list-store/response/user-measurement-list.response';
import { archiveProductUserAction, archiveProductUserSuccessAction } from './store/product-user-store/commands/archive-product-user/archive-product-user.action';
import { fetchAuthenticatedUserAction, fetchAuthenticatedUserSuccessAction } from './store/authenticated-user-store/queries/fetch-authenticated-user.action';
import { fetchProductUserListAction, fetchProductUserListSuccessAction } from './store/product-user-store/queries/fetch-product-user-list/fetch-product-user-list.action';
import { fetchUserMeasurementListAction, fetchUserMeasurementListSuccessAction } from '../user/measurement/store/user-measurement-list-store/queries/fetch-user-measurement-list/fetch-user-measurement-list.action';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';
import { selectAuthenticatedUser } from './store/authenticated-user-store/selectors/authenticated-user.selector';
import { selectProductUserList } from './store/product-user-store/selectors/product-user-list.selector';
import { selectUserMeasurementList } from '../user/measurement/store/user-measurement-list-store/selectors/user-measurement-list.selector';
import { setLoadingAction } from '../../../shared/store-services/set-loading/set-loading.action';

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
export class DashboardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public authenticatedUser$: Observable<AuthenticatedUserResponse> = this.store.select(selectAuthenticatedUser).pipe(
    filter((user: AuthenticatedUserResponse) => Boolean(user.calories),
      tap(() => this.changeDetectorRef.detectChanges()))
  );
  public userMeasurements$: Observable<UserMeasurementListResponse[]> = this.store.select(selectUserMeasurementList);
  public productsUser$: Observable<ProductUserListResponse[]> = this.store.select(selectProductUserList);
  public productsUser: ProductUserListResponse[] = [];

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
              private ngZone: NgZone,
              private changeDetectorRef: ChangeDetectorRef) {
    this.store.dispatch(setLoadingAction({ showLoading: true }));

    this.store.dispatch(fetchProductUserListAction({ id: this.decodedToken.id }));

    this.store.dispatch(fetchUserMeasurementListAction({ id: this.decodedToken.id }));

    this.productsUser$.pipe(
      take(2),
      takeLast(1),
      map((productsUser: ProductUserListResponse[]) => {
        productsUser.map((productUser: ProductUserListResponse) => {
          if (formatDate(productUser.createdOn, this.format, this.locale) === this.currentDate && productUser.archivedOn === null) {
            this.productsUser.push(productUser);
            this.productsUser = [...[], ...this.productsUser];
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
      take(2),
      takeLast(1),
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

    this.actions$.pipe(
      ofType(archiveProductUserSuccessAction),
      tap(() => this.store.dispatch(fetchProductUserListAction({ id: this.decodedToken.id }))),
      takeUntil(this.destroy$)
    ).subscribe();

    this.actions$.pipe(
      ofType(fetchAuthenticatedUserSuccessAction, fetchProductUserListSuccessAction, fetchUserMeasurementListSuccessAction),
      debounceTime(3000),
      tap(() => this.store.dispatch(setLoadingAction({ showLoading: false }))),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(fetchAuthenticatedUserAction());
    }, 1700);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
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

  public ngAfterViewInit(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
