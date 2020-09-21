import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringData' })

export class StringDataComponent implements PipeTransform {
  transform(data, param) {
    switch (param) {
      case 'xmindTitle':
        return data.replace(/<br>/, '');
      default:
        return data;
    }
  }
}