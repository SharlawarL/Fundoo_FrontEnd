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

  private show = true;
  public data: any;
  loading: boolean;

  constructor(
    private Notes: NotesService,
    private rout: Router) { 
    }

  ngOnInit():void {
    //loading data on load
    this.get_Notes()
  }

  //hidding take note
  showTakeNotes(){
    this.show = false;
  }

  // Adding New Notes
  AddNotes(event){
    // data taking from user input
    event.preventDefault()
    const target = event.target
    const title = target.querySelector('#title').value
    const notes = target.querySelector('#notes').value
    this.show = true

    // passing data towords to servece for inserting into database
    this.Notes.createNotesPost(title,notes).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr["message"])
        //onload notes will be refresh and get notes
        //this.get_Notes()
      }
     })
  }

  // Get the Notes which are store into database
  get_Notes(){

    //getting data from service
    this.Notes.Get_Notes().subscribe(Note_data=>{
      this.data = Note_data
      console.log(Note_data)
    })
  }
}
