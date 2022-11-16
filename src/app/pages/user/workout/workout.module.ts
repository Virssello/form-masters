import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { ProductService } from '../../../../demo/service/product.service';
import { RatingModule } from 'primeng/rating';
import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    CarouselModule,
    ButtonModule,
    RatingModule,
    DropdownModule,
    DataViewModule
  ],
  declarations: [WorkoutComponent],
  providers: [ProductService]
})
export class WorkoutModule { }
