import { AuthenticatedUserResponse } from '../global-store/authenticated-user/response/authenticated-user.response';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { EatenProductUserResponse } from './store/eaten-product-user-store/response/eaten-product-user.response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { Observable, Subject, Subscription, filter, takeUntil, tap } from 'rxjs';
import { ProductUserListResponse } from './store/product-user-store/response/product-user-list.response';
import { Store } from '@ngrx/store';
import { clearProductListAction } from '../food/products/store/product-list-store/commands/clear-product-list/clear-product-list.action';
import { fetchEatenProductUserAction } from './store/eaten-product-user-store/queries/fetch-eaten-product-user/fetch-eaten-product-user.action';
import { fetchProductUserListAction } from './store/product-user-store/queries/fetch-product-user-list/fetch-product-user-list.action';
import { fetchUserAction } from '../global-store/user-store/queries/fetch-user/fetch-user.action';
import { map } from 'rxjs/operators';
import { selectAuthenticatedUser } from '../global-store/authenticated-user/selectors/authenticated-user.selector';
import { selectEatenProductUser } from './store/eaten-product-user-store/selectors/eaten-product-user.selector';
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
    calories: 100,
    protein: 100,
    carbohydrates: 200,
    fat: 300
  };

  public productsUser$: Observable<ProductUserListResponse[]> = this.store.select(selectProductUserList);
  public product$: Observable<EatenProductUserResponse> = this.store.select(selectEatenProductUser);
  public eatenProductsUser: EatenProductUserResponse[] = [];

  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  private destroy$ = new Subject<void>;
  private subscription: Subscription;

  constructor(public layoutService: LayoutService,
              private store: Store,
              private jwtHelperService: JwtHelperService) {
    this.store.dispatch(fetchUserAction({ id: this.decodedToken.id }));

    this.store.dispatch(fetchProductUserListAction({ id: this.decodedToken.id }));

    this.productsUser$.pipe(
      tap((productsUser: ProductUserListResponse[]) => productsUser.map((productUser: ProductUserListResponse) => {
        this.store.dispatch(fetchEatenProductUserAction({ id: productUser.productId }));
      })),
      takeUntil(this.destroy$)
    ).subscribe();

    //TODO Figure out better solution with prisma
    this.product$.pipe(
      filter((product: any) => Boolean(product)),
      map((product: EatenProductUserResponse) => {
        this.eatenProductsUser.push(product);
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
    this.eatenProductsUser = [];
    this.store.dispatch(clearProductListAction());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
