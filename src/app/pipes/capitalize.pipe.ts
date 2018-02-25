import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(input: any, all: boolean = false) : any {
    
    if (!input) {
      return input;
    }
    
    if (!all) {
      return this.upperFirst(input.toLowerCase());
    }
    else {
      return input.toLowerCase()
        .split(' ')
        .map((value: string) => this.upperFirst(value))
        .join(' ');
    }
  }

  upperFirst (value: string): string {
    
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }

}
