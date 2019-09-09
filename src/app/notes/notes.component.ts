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
  public Token = localStorage.getItem('User')
  

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
    const token = this.Token
    this.show = true

    // passing data towords to servece for inserting into database
    this.Notes.createNotesPost(title,notes,token).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr["message"])
        //onload notes will be refresh and get notes
        this.get_Notes()
      }
     })
  }

  // Get the Notes which are store into database
  get_Notes(){
    const user_token = this.Token
    //getting data from service
    this.Notes.Get_Notes(user_token).subscribe(Note_data=>{
      this.data = Note_data
      console.log(Note_data)
    })
  }

  //open model box
  modelBox(){
    
  }
}
