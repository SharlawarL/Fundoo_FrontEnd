import { Component, OnInit, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



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
  public model_box = false;
  public model_reminder : any;
  public showSetReminmder = true;
  success : any
  public Note_view ="";
  public drag_note;
  public list:any;
  view:String;

  constructor(
    private Notes: NotesService,
    private rout: Router) { 
    }

  ngOnInit():void {
    //loading data on load
    this.get_Notes()
    this.Notes.currentView.subscribe(view => this.view = view)
  }

  Note_view_grid()
  {
    this.Note_view = "Grid"
  }
  Note_view_list()
  {
    this.Note_view = "List"
    this.data.changeView("")
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
    })
  }

  //open model box
  modelBox(note){
    this.model_id = note.note_id
    this.model_title = note.title
    this.model_Note = note.Notes
    this.model_reminder = note.reminder
  }
  //show reminder set
  setRemider()
  {
    this.showSetReminmder = false;
    console.log("reminder click")
  }
  //hide reminder set
  hideRemider()
  {
    this.showSetReminmder = true;
    console.log("reminder unclick")
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
    this.model_box = true
     event.preventDefault()
     const target = event.target
     const title = target.querySelector('#title').value
     const Notes = target.querySelector('#Notes').value
     const reminder = target.querySelector('#reminder').value
     const id = target.querySelector('#Notes_id').value
     let Notes_data = 'note_id='+id+'&&title='+title+'&&Notes='+Notes+'&&reminder='+reminder
     this.Notes.Update_Notes(Notes_data).subscribe(data=>{ this.get_Notes()  })
   }

   //for drag nd drop of notes
   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let drag_data = "previous="+event.previousIndex+"&&next="+event.currentIndex+"&&token="+this.Token
      this.Notes.Update_notesindex(drag_data).subscribe(data=>{ this.get_Notes()  })
    } else {  
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  //for trash the Notes
  trash(event)
  {
    console.log('Trash Cliked..'+event)
  }
}
