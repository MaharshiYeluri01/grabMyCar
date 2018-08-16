import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value, args?: any): any {
    if(value)
   { 
    var ts = new Date(value.seconds*1000);
        let date=ts.toLocaleDateString();
    return date;}

    else return null
  }

}
