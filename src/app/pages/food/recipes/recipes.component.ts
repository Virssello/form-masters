import { Component } from '@angular/core';
import { Product } from '../../../../demo/api/product';
import { SelectItem } from 'primeng/api';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './recipes.component.html'
})
export class RecipesComponent {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';


  constructor(private store: Store) { }

  ngOnInit() {

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


}
