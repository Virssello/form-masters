import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  public model: any[] = [];

  constructor(public layoutService: LayoutService) { }

  public ngOnInit(): void {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }
        ]
      },
      {
        label: 'User',
        items: [
          { label: 'Measurements', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/home/user/measurements'] },
          { label: 'Workouts', icon: 'pi pi-fw pi-heart', routerLink: ['/home/user/workouts'] },
        ]
      },
      {
        label: 'Food',
        items: [
          { label: 'Products', icon: 'pi pi-fw pi-apple', routerLink: ['/home/food/products'] },
          { label: 'Recipes', icon: 'pi pi-fw pi-book', routerLink: ['/home/food/recipes'] },
        ]
      }
    ];
  }
}
