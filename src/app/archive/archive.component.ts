import { Component, OnInit, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from "@angular/common";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-notes',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit{

  @ViewChild('closebutton') closebutton;
  private show = true;
  public data: any;
  loading: boolean;
  public token = localStorage.getItem('User')
  public modelClass = "notes_cards"
  public model_id : any;
  public model_title : any;
  public model_Note : any;
  public model_box = false;
  public model_reminder : any;
  public showSetReminmder = true;
  success : any
  public note_view ="";
  public drag_note;
  public list:any;
  public color_set: any;
  view:String;

  constructor(
    private Notes: NotesService,
    private route: ActivatedRoute,
    private rout: Router) { 
    }

  ngOnInit():void {
    //loading data on load
    this.get_Notes()
    this.Notes.currentView.subscribe(view => this.view = view)
    this.get_color()
  }

  Note_view_grid()
  {
    this.note_view = "Grid"
  }
  Note_view_list()
  {
    this.note_view = "List"
    this.data.changeView("")
  }
  //hidding take note
  showTakeNotes(){
    this.show = false;
  }
// fo rcolor set
get_color()
{
  const color  = [
    {color:'#bfff00'},
    {color:'#00ff00'},
    {color:'#00ffff'},
    {color:'#0080ff'},
    {color:'#0099cc'},
    {color:'#80ced6'},
    {color:'#f0f0f0'},
    {color:'#eca1a6'},
    {color:'#6b5b95'},
    {color:'#ffbf00'},
    {color:'#ff8000'},
    {color:'#8000ff'}
  ]
  this.color_set = color
  console.log(color)
}
change_color(color : any,id : any)
{
    let Notes_data = 'note_id='+id+'&&color='+color+'&&token='+this.token
    this.Notes.Update_color(Notes_data).subscribe(
      data=>{
        this.get_Notes()
        this.rout.navigate(['/dashboard/archive'])
    }
    )
}

  // Get the Notes which are store into database
  get_Notes(){
    const user_token = this.token
    //getting data from service
    this.Notes.Get_total_notes(user_token).subscribe(note_data=>{
      this.data = note_data
      console.log(note_data)
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
   Add_reminder(event : any)
   {
     this.showSetReminmder = true;
     event.preventDefault()
     const target = event.target
     const reminder_set = target.querySelector('#rdate').value
     this.model_reminder = reminder_set
   }
   //update_reminder
   update_reminder(event : any)
   {
    event.preventDefault()
    const target = event.target
    const rdate = target.querySelector('#rdate').value
    const id = target.querySelector('#note_id').value
    let Notes_data = 'note_id='+id+'&&rdate='+rdate+'&&token='+this.token
    this.Notes.Update_reminderdate(Notes_data).subscribe(data=>{ this.get_Notes()  })
    this.get_Notes()
    this.rout.navigate(['/dashboard/archive'])
   }

   //update notes
   UpdateNotes(event: any)
   {
     event.preventDefault()
     const target = event.target
     const title = target.querySelector('#title').value
     const Notes = target.querySelector('#Notes').value
     const reminder = target.querySelector('#reminder').value
     const id = target.querySelector('#Notes_id').value
     let Notes_data = 'note_id='+id+'&&title='+title+'&&Notes='+Notes+'&&reminder='+reminder
     this.Notes.Update_Notes(Notes_data).subscribe(
      data=>{
        this.get_Notes()
        this.rout.navigate(['/dashboard/archive'])
    }
     )
     this.rout.navigate(['notes'],{relativeTo: this.route});
   }


   //for drag nd drop of notes
   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let drag_data = "previous="+event.previousIndex+"&&next="+event.currentIndex+"&&token="+this.token
      this.Notes.Update_notesindex(drag_data).subscribe(data=>{ this.get_Notes()  })
    } else {  
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  //for trash the Notes
  trash(note_data : any)
  {
    let data = "note_id="+note_data.note_id+"&&token="+this.token
    this.Notes.addtrash(data).subscribe(
      data=>{
        this.get_Notes()
        this.rout.navigate(['/dashboard/archive'])
    }
    )
  }
  //for archive the Notes
  archive(note_data : any)
  {
    let data = "note_id="+note_data.note_id+"&&token="+this.token
    this.Notes.getarchive(data).subscribe(
      data=>{
        this.get_Notes()
        this.rout.navigate(['/dashboard/archive'])
    }
    )
  }
}
