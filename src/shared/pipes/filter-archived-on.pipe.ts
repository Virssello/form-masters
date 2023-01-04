import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArchivedOn'
})
export class FilterArchivedOnPipe implements PipeTransform {

  public transform(values: any[]): any[] {
    return values.filter((item: any) => item.archivedOn === null);
  }

}
