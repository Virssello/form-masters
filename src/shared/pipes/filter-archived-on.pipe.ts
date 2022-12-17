import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArchivedOn'
})
export class FilterArchivedOnPipe implements PipeTransform {

  public transform(values: any[]): any[] {
    const filteredValues = values.filter((item: any) => item.archivedOn === null);

    return filteredValues;
  }

}
