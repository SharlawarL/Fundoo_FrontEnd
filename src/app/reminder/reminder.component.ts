import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {


  public data: any;
  public temp_data: any;
  loading: boolean;
  public Token = localStorage.getItem('User')
  public Note_view ="";
  view:String;

  constructor(
    private Notes: NotesService
  ) { }

  ngOnInit() {
    //loading data on load
    this.get_Notes()
    //this.Notes.currentView.subscribe(view => this.view = view)
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

}
