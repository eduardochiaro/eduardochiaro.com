import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform (input: any, pattern: any, replacement: any): any {
    
    if (!input || !pattern || !replacement) {
      return input;
    }

    const regex = new RegExp(pattern, 'gi');
    
    return input.replace(regex, replacement);
  
  }
}