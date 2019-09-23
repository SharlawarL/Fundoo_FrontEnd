import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trash'
})
export class TrashPipe implements PipeTransform {

  transform(data: any, args?: any): any {
    return data.filter((notes_value) => (notes_value.is_trash == '1' && notes_value.is_archive   != '1'));
  }

}
