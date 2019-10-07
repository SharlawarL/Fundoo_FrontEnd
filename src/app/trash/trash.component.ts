import { Component, OnInit, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-notes',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit{

  @ViewChild('closebutton') closebutton;
  public data: any;
  public total_notes: any;
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

  // Get the Notes which are store into database
  get_Notes(){
    const user_token = this.token
    //getting data from service
    this.Notes.Get_total_notes(user_token).subscribe(note_data=>{
      this.total_notes = note_data
      console.log(this.total_notes)
    })
  }



  //for trash the Notes
  restore_trash(note_data : any)
  {
    let data = "note_id="+note_data.note_id+"&&token="+this.token
    this.Notes.restoretrash(data).subscribe(
      data=>{
        this.get_Notes()
        this.rout.navigate(['/dashboard/trash'])
    }
    )
  }
  //for trash the Notes
  delete_trash(note_data : any)
  {
    let data = "note_id="+note_data.note_id+"&&token="+this.token
    this.Notes.deletetrash(data).subscribe(
      data=>{
        this.get_Notes()
        this.rout.navigate(['/dashboard/trash'])
    }
    )
  }
}
