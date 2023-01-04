import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'filterCurrentDate'
})
export class FilterCurrentDatePipe implements PipeTransform {

  public format = 'dd/MM/yy';
  public locale = 'en-US';
  public currentDate = formatDate(Date.now(), this.format, this.locale);
  public transform(values: any[]): any[] {
    return values.filter((item: any) => formatDate(item.createdOn, this.format, this.locale) === this.currentDate);
  }

}
