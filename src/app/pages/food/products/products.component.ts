import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../demo/api/product';
import { ProductService } from '../../../../demo/service/product.service';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public sourceProducts: Product[] =[
    { name: 'Amy Elsner' },
    { name: 'Anna Fali' },
    { name: 'Asiya Javayant' },
    { name: 'Bernardo Dominic' },
    { name: 'Elwin Sharvill' },
    { name: 'Ioni Bowcher' },
    { name: 'Ivan Magalhaes' },
    { name: 'Onyama Limba' },
    { name: 'Stephen Shaw' },
    { name: 'XuXue Feng' }
  ];
  public targetProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.productService.getProductsSmall().then((products: Product[]) => this.sourceProducts = products);
  }

}
