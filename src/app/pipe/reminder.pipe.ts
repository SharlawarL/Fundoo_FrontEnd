import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reminder'
})
export class ReminderPipe implements PipeTransform {

  transform(data: any, args?: any): any {
    return data.filter((notes_value) => (notes_value.reminder != '' &&
    notes_value.is_trash != '1' && notes_value.is_archive   != '1'));
  }

}
