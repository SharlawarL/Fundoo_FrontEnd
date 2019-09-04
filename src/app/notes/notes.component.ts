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
  public data: any;
  loading: boolean;

  constructor(
    private Notes: NotesService,
    private rout: Router) { 
    }

  ngOnInit():void {
    this.loading=true
    this.Notes.Get_Notes().subscribe(Note_data=>{
      this.data = Note_data
      console.log(Note_data)
      this.loading=false
    })
    
  }
  _initialize(): void {
    
  }

  popUp(){
    this.pop = false;
  }
  popClose(){
    this.pop = true;
  }

  // for adding Notes
  AddNotes(event){
    // getting data from inputs
    event.preventDefault()
    const target = event.target
    const title = target.querySelector('#title').value
    const notes = target.querySelector('#notes').value

    this.pop = true

    // passing data for notes service
    this.Notes.createNotesPost(title,notes).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr["message"])

        this.Notes.Get_Notes().subscribe(Note_data=>{
          this.data = Note_data
          console.log(Note_data)
          this.loading=false
        })
      }
     })
  }

}
