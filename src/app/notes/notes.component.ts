import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  private show = true;
  public data: any;
  loading: boolean;
  public Token = localStorage.getItem('User')
  public modelClass = "notes_cards"
  public model_id : any;
  public model_title : any;
  public model_Note : any;
  public model_reminder : any;
  public showSetReminmder = true;
  success : any
  

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
  modelBox(d){
    this.model_id = d.note_id
    this.model_title = d.title
    this.model_Note = d.Notes
    this.model_reminder = d.reminder
  }
  setRemider()
  {
    this.showSetReminmder = false;
  }
   //for adding reminder
   Add_reminder(event)
   {
     this.showSetReminmder = true;
     event.preventDefault()
     const target = event.target
     const reminder_set = target.querySelector('#rdate').value
     this.model_reminder = reminder_set
   }

   //update notes
   UpdateNotes(event)
   {
     console.log("click")
     event.preventDefault()
     const target = event.target
     const title = target.querySelector('#title').value
     const Notes = target.querySelector('#Notes').value
     const reminder = target.querySelector('#reminder').value
     const id = target.querySelector('#Notes_id').value
     let body = 'note_id='+id+'&&title='+title+'&&Notes='+Notes+'&&reminder='+reminder
     this.Notes.Update_Notes(body).subscribe(data=>
      {
        console.log(data)
        this.get_Notes()
      })
   }
}
