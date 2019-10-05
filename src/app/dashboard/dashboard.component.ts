import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MessagingService } from "../service/messaging.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private show = true;
  public user_data: any;
  public data: any;
  public lebel: any;
  private add_reminder = true
  private reminder : any
  loading: boolean;
  public token = localStorage.getItem('User')
  public showSetReminmder = true;
  public showInputReminmder = true;
  public notes_view = true;
  public classActive = "notes";
  public view_set = "Grid"
  public imageSrc :  any;
  view:String;
  message;
  selecteded;
  

  constructor
  (
        private Notes: NotesService,
        private Auth: AuthService,
        private route: ActivatedRoute,
        private Note : NotesService,
        private rout: Router,
        private messagingService: MessagingService
  ){}

  ngOnInit():void 
  {
    //for invalid or want to direct access this page
    if(!this.token)
    {
      console.log("lalitlll ")
      this.rout.navigate(['/login'])
    }
    //loading data on load
    this.get_Notes()
    this.get_user()
    this.get_labels()
    this.messagingService.requestPermission(this.token)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    this.rout.navigate(['notes'],{relativeTo: this.route});
    this.Note.currentView.subscribe(view => this.view = view)
  }

  //hidding take note
  showTakeNotes()
  {
    this.show = false;
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
        this.showNotes()
      }
    )
  }


  // Get the Notes which are store into database
  get_Notes()
  {
    //getting data from service
    this.Notes.Get_Notes(this.token).subscribe(Note_data=>{
      this.data = Note_data
    })
  }

  // get the user details
  get_user()
  {
    //getting data from service
    this.Auth.Get_User(this.token).subscribe(user_data=>{
      this.user_data = user_data
    })
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

  //show notes page
  showNotes(){
    this.classActive = "notes"
    this.rout.navigate(['notes'],{relativeTo: this.route});
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
    this.notes_view = false; 
    this.view_set = "List";
    this.Note.changeView("List")
  }
  Note_view_list(){
    this.notes_view = true; 
    this.view_set = "Grid";
    this.Note.changeView("Grid")
  }

  setRemider()
  {
    this.showSetReminmder = false;
  }

  // adding labels
  addlebel(event :any)
  {
      event.preventDefault()
      const target = event.target
      const lebel = target.querySelector('#lebel').value
      let lebel_data = "lebel="+lebel+"&&token="+this.token
      this.Notes.add_lebel(lebel_data).subscribe(data=>{ 
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

  // delete labels
  deletelebel(lebel_id :any)
  {
    let lebel_data = "lebel="+lebel_id+"&&token="+this.token
    this.Notes.delete_lebel(lebel_data).subscribe(data=>{ 
      this.ngOnInit()
    })
  }
  update_lebel(event : any)
  {
    event.preventDefault();
    const target = event.target
    const lebel_id = target.querySelector('#lebel_id').value
    const lebel = target.querySelector('#lebel').value
    let lebel_data = "lebel_id="+lebel_id+"&&lebel="+lebel+"&&token="+this.token
    this.Notes.Update_lebel(lebel_data).subscribe(data=>
    { 
      this.ngOnInit()
    })
  }

  readURL(event){
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selecteded = event.target.files[0]

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        this.imageSrc = reader.result;
      }
    }
}

  changephoto(event : any)
  {
    event.preventDefault();
    const target = event.target
    let photo_data = "photo="+this.imageSrc+"&&token="+this.token
    this.Auth.change_photo(photo_data).subscribe(
      (res: Response) => {
        console.log(res)
      }
    )
  }
}

