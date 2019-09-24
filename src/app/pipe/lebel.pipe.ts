import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lebel'
})
export class LebelPipe implements PipeTransform {

  transform(data: any, note_id: any): any {
    return data.filter((lebels) => (lebels.note_id == note_id));
  }
}
