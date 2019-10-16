import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lebel'
})
export class LebelPipe implements PipeTransform {

  transform(lebel_data: any, note_id: any): any {
    if (!lebel_data) return null;
    return lebel_data.filter((lebels) => (lebels.note_id == note_id));
  }
}
