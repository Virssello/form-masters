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
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
        ]
      },
      {
        label: 'User',
        items: [
          { label: 'Measurements', icon: 'pi pi-fw pi-eye', routerLink: ['/user/measurements'] },
          { label: 'Workouts', icon: 'pi pi-fw pi-plus', routerLink: ['/user/workouts'] },
        ]
      },
      {
        label: 'Food',
        items: [
          { label: 'Products', icon: 'pi pi-fw pi-prime', routerLink: ['/food/products'] },
          { label: 'Recipes', icon: 'pi pi-fw pi-desktop', routerLink: ['/food/recipes'] },
        ]
      },
      {
        label: 'Auth',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/auth/login']
          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/auth/register']
          },
        ]
      }
    ];
  }
}
