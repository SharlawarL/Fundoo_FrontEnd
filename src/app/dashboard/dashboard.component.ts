import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  private reminder_box = true
  loading: boolean;
  public Token = localStorage.getItem('User')
  public Notes_view = localStorage.getItem('Notes_View')

  constructor(
    private Notes: NotesService,
    private Auth: AuthService,
    private route: ActivatedRoute,
    private rout: Router) { 
    }

  ngOnInit():void {
    //loading data on load
    this.get_Notes()
    this.get_user()
    this.rout.navigate(['notes'],{relativeTo: this.route});
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
    const user_token = this.Token
    this.show = true


    // passing data towords to servece for inserting into database
    this.Notes.createNotesPost(title,notes,user_token).subscribe(data=>{
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

    //getting data from service
    this.Notes.Get_Notes(this.Token).subscribe(Note_data=>{
      this.data = Note_data
      console.log(Note_data)
    })
  }

  get_user()
  {
    //getting data from service
    this.Auth.Get_User(this.Token).subscribe(User_data=>{
      this.user_data = User_data
      console.log(User_data)
    })
  }

  //show notes page
  showNotes(){
    this.rout.navigate(['notes'],{relativeTo: this.route});
  }

  //for show reminder page
  showReminder(){
    this.rout.navigate(['reminder'],{relativeTo: this.route});
  }

  //for adding reminder
  Add_reminder()
  {
    this.reminder_box = false

  }

  //for show archive page
  showArchive(){
    this.rout.navigate(['archive'],{relativeTo: this.route});
  }

  //for show trash
  showTrash(){
    this.rout.navigate(['trash'],{relativeTo: this.route});
  }
  logout(){
    localStorage.removeItem('User')
    this.rout.navigate(['/login'],{relativeTo: this.route});
  }
  refresh(){
    this.rout.navigate(['/dashboard/notes'],{relativeTo: this.route});
  }
  Note_view(){
    if(this.Notes_view == 'List')
      localStorage.setItem('Notes_view','Grid')
    if(this.Notes_view == 'Grid')
      localStorage.setItem('Notes_view','List')
  }
}
