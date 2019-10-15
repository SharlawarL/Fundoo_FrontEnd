import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notes'
})
export class NotesPipe implements PipeTransform {
  transform(data: any): any {
    return data.filter((notes_value : any) => (notes_value.is_trash == '0' && notes_value.is_archive   == '0'));
  }

}