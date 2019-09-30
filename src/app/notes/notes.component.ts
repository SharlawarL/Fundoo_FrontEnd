import { Component, OnInit, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  @ViewChild('closebutton') closebutton;
  lebel_list = []
  private show = true;
  public data: any;
  public lebel: any;
  public lebel_data: any;
  public temp: any;
  loading: boolean;
  public token = localStorage.getItem('User')
  public modelClass = "notes_cards"
  public model_id : any;
  public model_title : any;
  public model_Note : any;
  public model_color : any;
  public model_box = false;
  public model_reminder : any;
  public showSetReminmder = true;
  public showInputReminmder = true;
  public x: number;
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
        this.get_labels()
        this.get_labelsnote()
        this.get_color()
        this.Notes.currentView.subscribe(view => this.view = view)
  }

  // Adding New Notes
  AddNotes(event : any)
  {
    // data taking from user input
    event.preventDefault()
    const target = event.target
    const title = target.querySelector('#title').value
    const notes = target.querySelector('#notes').value
    const reminder = target.querySelector('#reminder').value
    const token = this.token
    let notes_data = 'title='+title+'&Notes='+notes+'&user_id='+token+'&reminder='+reminder
    this.show = true

    // passing data towords to servece for inserting into database
    this.Notes.createNotesPost(notes_data).subscribe(
      data=>
      {
        this.ngOnInit()
      }
    )
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
  }

  //chenge color function
  change_color(color : any,id : any)
  {
      let Notes_data = 'note_id='+id+'&&color='+color+'&&token='+this.token
      this.Notes.Update_color(Notes_data).subscribe(data=>{ 
        this.ngOnInit()
      })
  }

  // Get the Notes which are store into database
  get_Notes(){
    const user_token = this.token
    //getting data from service
    this.Notes.Get_Notes(user_token).subscribe(note_data=>{
      this.data = note_data
      console.log(note_data)
    })
  }

  //open model box content
  modelBox(note){
    this.model_id = note.note_id
    this.model_title = note.title
    this.model_Note = note.Notes
    this.model_color = note.color
    this.model_reminder = note.reminder
  }

  //show reminder set
  setRemider()
  {
    this.showSetReminmder = false;
  }

  //hide reminder set
  hideRemider()
  {
    this.showSetReminmder = true;
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
    this.Notes.Update_reminderdate(Notes_data).subscribe(data=>{ 
      this.ngOnInit()
    })
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
    this.Notes.Update_Notes(Notes_data).subscribe(data=>{
      this.ngOnInit()
    })
  }


  //for drag nd drop of notes
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      //let drag_data = "previous="+event.previousIndex+"&&next="+event.currentIndex+"&&token="+this.token
      //this.Notes.Update_notesindex(drag_data).subscribe(data=>{ this.get_Notes()  })
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
      data=>
      {
        this.ngOnInit()
      }
    )
  }

  //for archive the Notes
  archive(note_data : any)
  {
    let data = "note_id="+note_data.note_id+"&&token="+this.token
    this.Notes.addarchive(data).subscribe(data=>
      {
        this.ngOnInit()
      }) 
  }

  // Get the Notes which are store into database
  get_labels(){
    //getting data from service
    this.Notes.Get_labels(this.token).subscribe(lebel_data=>{
    this.lebel = lebel_data
  })
  }

  //add lebel to notes
  attach_label(id : number,note_id: any)
  {
    let data = "lebel_id="+id+"&&note_id="+note_id+"&&token="+this.token
    this.Notes.addlebelnotes(data).subscribe( data =>
      {
        this.ngOnInit()
      })
  }

  // Get the lebel notes which are store into database
  get_labelsnote(){
    //getting data from service
    this.Notes.Get_labelsnote(this.token).subscribe(
      lebel_data=>{
            this.lebel_data = lebel_data
    })
  }
  //remove lebel from notes
  remove_label(lebel_id: number)
  {
    let data = "id="+lebel_id+"&&token="+this.token
    this.Notes.removelebel(data).subscribe(
      data =>
      {
        this.ngOnInit()
      }
    )
  }
}
