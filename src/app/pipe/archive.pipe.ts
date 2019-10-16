import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'archive',
  pure: false
})
export class ArchivePipe implements PipeTransform {

  transform(data: any): any {
    if (!data) return null;
    return data.filter((notes_value : any) => (notes_value.is_trash != '1' && notes_value.is_archive   == '1'));
  }

}
