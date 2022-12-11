import { Actions } from '@ngrx/effects';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { ProductListResponse } from './store/product-list-store/response/product-list.response';
import { Store } from '@ngrx/store';
import { fetchProductListAction } from './store/product-list-store/queries/fetch-product-list/fetch-product-list.action';
import { selectProductList } from './store/product-list-store/selectors/product-list.selector';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {

  public products$: Observable<ProductListResponse[]> = this.store.select(selectProductList);
  public products: ProductListResponse[] = [];
  public targetProducts: ProductListResponse[] = [];

  constructor(private store: Store,
              private actions$: Actions,
              private jwtHelperService: JwtHelperService) {
    this.store.dispatch(fetchProductListAction());

    this.products$.pipe(
      tap((products: ProductListResponse[]) => this.products = products)
    ).subscribe();
  }

}
