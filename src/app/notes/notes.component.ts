import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private pop = true;

  constructor(private Auth: AuthService,
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
    data.preventDefault()
    const target = data.terget
    const title = target.querySelector('#title').value
    const notes = target.querySelector('#notes').value

    this.Auth.createNotes(title,notes).subscribe(data=>{
      console.log(data)

    })
  }

}
