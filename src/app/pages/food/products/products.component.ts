import { Actions, ofType } from '@ngrx/effects';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { ProductListResponse } from './store/product-list-store/response/product-list.response';
import { Store } from '@ngrx/store';
import { addProductUserAction, addProductUserSuccessAction } from './store/product-user-store/commands/add-product-user/add-product-user.action';
import { clearProductListAction } from './store/product-list-store/commands/clear-product-list/clear-product-list.action';
import { fetchProductListAction } from './store/product-list-store/queries/fetch-product-list/fetch-product-list.action';
import { selectProductList } from './store/product-list-store/selectors/product-list.selector';
import { setLoadingAction } from '../../../../shared/store-services/set-loading/set-loading.action';

@Component({
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent implements OnDestroy {

  public products$: Observable<ProductListResponse[]> = this.store.select(selectProductList);
  public products: ProductListResponse[] = [];
  public targetProducts: ProductListResponse[] = [];
  public weight: number = 0.001;

  private destroy$ = new Subject<void>;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  constructor(private store: Store,
              private actions$: Actions,
              private jwtHelperService: JwtHelperService,
              private changeDetectorRef: ChangeDetectorRef,
              private messageService: MessageService) {
    this.store.dispatch(setLoadingAction({ showLoading: true }));

    this.store.dispatch(fetchProductListAction());

    this.actions$.pipe(
      ofType(addProductUserSuccessAction),
      tap(() => this.messageService.add({ detail: 'Product has been saved' })),
      tap(() => {
        this.products = [];
        this.targetProducts = [];
      }),
      tap(() => this.store.dispatch(fetchProductListAction())),
      tap(() => this.changeDetectorRef.detectChanges()),
      takeUntil(this.destroy$)
    ).subscribe();

    this.products$.pipe(
      filter((product: ProductListResponse[]) => Boolean(product)),
      tap((products: ProductListResponse[]) => this.products = [...this.products, ...products]),
      tap(() => this.changeDetectorRef.detectChanges()),
      tap(() => this.store.dispatch(setLoadingAction({ showLoading: false }))),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public saveProducts(): void {
    this.targetProducts.map((product: ProductListResponse) => {
      this.store.dispatch(addProductUserAction(
        { addProductUser:
          {
            userId: this.decodedToken.id,
            productId: product.id,
            weight: this.weight
          }
        }
      ));
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.store.dispatch(clearProductListAction());
  }
}
