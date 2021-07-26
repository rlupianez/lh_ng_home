import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  transform(value: Object, args: string[]): any {
    return "$" + value;
  }
}
