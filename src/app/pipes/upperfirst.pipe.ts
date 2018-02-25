import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperfirst'
})
export class UpperfirstPipe implements PipeTransform {
  
  transform(input: any): any {
    
    if (!input) {
      return input;
    }
    
    return this.upperFirst(input);
  }

  upperFirst (value: string): string {
    
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }

}
