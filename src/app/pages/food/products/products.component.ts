import { Actions, ofType } from '@ngrx/effects';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { ProductListResponse } from './store/product-list-store/response/product-list.response';
import { Store } from '@ngrx/store';
import {
  addProductUserAction,
  addProductUserSuccessAction
} from './store/product-user-store/commands/add-product-user/add-product-user.action';
import { clearProductListAction } from './store/product-list-store/commands/clear-product-list/clear-product-list.action';
import { fetchProductListAction } from './store/product-list-store/queries/fetch-product-list/fetch-product-list.action';
import { selectProductList } from './store/product-list-store/selectors/product-list.selector';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent implements OnDestroy {

  public products$: Observable<ProductListResponse[]> = this.store.select(selectProductList);
  public initialProducts: ProductListResponse[] = [];
  public products: ProductListResponse[] = [];
  public targetProducts: ProductListResponse[] = [];
  public weight: number = 0.001;

  private destroy$ = new Subject<void>;
  private decodedToken = this.jwtHelperService.decodeToken(this.jwtHelperService.tokenGetter());
  constructor(private store: Store,
              private actions$: Actions,
              private jwtHelperService: JwtHelperService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.actions$.pipe(
      ofType(addProductUserSuccessAction),
      tap(() => {
        this.products = [];
        this.initialProducts = [];
        this.targetProducts = [];
      }),
      tap(() => this.store.dispatch(fetchProductListAction())),
      takeUntil(this.destroy$)
    ).subscribe();

    this.store.dispatch(fetchProductListAction());

    this.products$.pipe(
      filter((product: ProductListResponse[]) => Boolean(product)),
      tap((products: ProductListResponse[]) => products.forEach((product: ProductListResponse) => this.products.push(product))),
      tap(() => this.changeDetectorRef.detectChanges()),
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
