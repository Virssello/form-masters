import { Component } from '@angular/core';
import { Product } from '../../../../demo/api/product';
import { ProductService } from '../../../../demo/service/product.service';

@Component({
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
  public products: Product[] = [
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

  public responsiveOptions;

  constructor(private productService: ProductService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  public ngOnInit(): void {
    this.productService.getProductsSmall().then((products: Product[]) => {
      this.products = products;
    });
  }

}
