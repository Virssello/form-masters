import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProductService } from '../../../demo/service/product.service';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { UiModule } from '../../../shared/ui-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    DashboardsRoutingModule,
    UiModule
  ],
  declarations: [DashboardComponent],
  providers: [ProductService]
})
export class DashboardModule { }
