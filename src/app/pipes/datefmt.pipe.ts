import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datefmt',
  standalone: true
})
export class DatefmtPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) {
      return "select date"
    }
    const date = new Date(value);
    const days = `${date.getDate()}`; 
    const month = `${date.getMonth() + 1}`; 
    const hours = `${date.getHours()}`; 
    const minutes = `${date.getMinutes()}`;
    return `${days.length === 1 ? '0' : ''}${days}.${month.length === 1 ? '0' : ''}${month}.${date.getFullYear()} ${hours.length === 1 ? '0' : ''}${hours}:${minutes.length === 1 ? '0' : ''}${minutes}`;
  }

}
