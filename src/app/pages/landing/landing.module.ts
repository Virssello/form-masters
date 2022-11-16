import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

import { DividerModule } from 'primeng/divider';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    DividerModule,
    RippleModule
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }
