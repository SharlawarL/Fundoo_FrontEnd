import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../notes.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject }    from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private show = true;
  public user_data: any;
  public data: any;
  private add_reminder = true
  private reminder : any
  loading: boolean;
  public Token = localStorage.getItem('User')
  public showSetReminmder = true;
  public showInputReminmder = true;
  public Notes_view = true;
  public classActive = "notes";

  public view_set = "Grid"

  public name="lalit"
  view:String;

  constructor(
    private Notes: NotesService,
    private Auth: AuthService,
    private route: ActivatedRoute,
    private Note : NotesService,
    private rout: Router) { 
    }

  ngOnInit():void {
    //loading data on load
    this.get_Notes()
    this.get_user()
    this.rout.navigate(['notes'],{relativeTo: this.route});
    this.Note.currentView.subscribe(view => this.view = view)
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
    const Notes = target.querySelector('#notes').value
    const reminder = target.querySelector('#reminder').value
    const token = this.Token
    let Notes_data = 'title='+title+'&Notes='+Notes+'&user_id='+token+'&reminder='+reminder
    this.show = true

    // passing data towords to servece for inserting into database
    this.Notes.createNotesPost(Notes_data).subscribe(data=>{
      console.log(data)
      this.get_Notes
     })
  }


  // Get the Notes which are store into database
  get_Notes(){

    //getting data from service
    this.Notes.Get_Notes(this.Token).subscribe(Note_data=>{
      this.data = Note_data
    })
  }

  get_user()
  {
    //getting data from service
    this.Auth.Get_User(this.Token).subscribe(User_data=>{
      this.user_data = User_data
    })
  }

  //show notes page
  showNotes(){
    this.classActive = "notes"
    this.rout.navigate(['notes'],{relativeTo: this.route});
  }

  //for show reminder page
  showReminder(){
    this.classActive = "reminder"
    this.rout.navigate(['reminder'],{relativeTo: this.route});
  }

  //for adding reminder
  Add_reminder(event)
  {
    this.showSetReminmder = true;
    this.showInputReminmder = false;
    event.preventDefault()
    const target = event.target
    const reminder_set = target.querySelector('#rdate').value
    this.reminder = reminder_set
  }

  //for show archive page
  showArchive(){
    this.classActive = "archive"
    this.rout.navigate(['archive'],{relativeTo: this.route});
  }

  //for show trash
  showTrash(){
    this.classActive = "trash"
    this.rout.navigate(['trash'],{relativeTo: this.route});
  }
  logout(){
    localStorage.removeItem('User')
    this.rout.navigate(['/login'],{relativeTo: this.route});
  }
  refresh(){
    this.rout.navigate(['/dashboard/notes'],{relativeTo: this.route});
  }
  Note_view_grid(){
    this.Notes_view = false; 
    this.view_set = "List";
    this.Note.changeView("List")
  }
  Note_view_list(){
    this.Notes_view = true; 
    this.view_set = "Grid";
    this.Note.changeView("Grid")
  }

  setRemider()
  {
    this.showSetReminmder = false;
  }
}
