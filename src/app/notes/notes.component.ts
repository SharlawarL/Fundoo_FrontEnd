import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private pop = true;

  constructor(private Notes: NotesService,
    private rout: Router) { }

  ngOnInit() {
  }

  popUp(){
    this.pop = false;
  }
  popClose(){
    this.pop = true;
  }

  create_note(data){
    this.pop = true;
    data.preventDefault()
    const target = data.terget
    const title = target.querySelector('#title').value
    const notes = target.querySelector('#notes').value

    this.Notes.createNotes(title,notes).subscribe(data=>{
      window.alert(data);
    })
  }

}
