import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trash'
})
export class TrashPipe implements PipeTransform {

  transform(total_notes: any, args?: any): any {
    if (!total_notes) return null;
    return total_notes.filter((notes_value) => (notes_value.is_trash == '1' && notes_value.is_archive   != '1'));
  }

}
