import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  public items!: MenuItem[];

  @ViewChild('menubutton') public menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') public topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') public menu!: ElementRef;

  constructor(public layoutService: LayoutService) { }
}
