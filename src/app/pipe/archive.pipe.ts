import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'archive'
})
export class ArchivePipe implements PipeTransform {

  transform(data: any): any {
    return data.filter((notes_value : any) => (notes_value.is_trash != '1' && notes_value.is_archive   == '1'));
  }

}
