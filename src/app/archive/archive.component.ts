import { Component, OnInit } from '@angular/core';
import { NotesService } from '../service/notes.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public data: any;
  public temp_data: any;
  loading: boolean;
  public token = localStorage.getItem('User')
  public Note_view ="";
  view:String;

  constructor(
    private Notes: NotesService,
    private route: ActivatedRoute,
    private rout: Router
  ) { }

  ngOnInit() {
    //loading data on load
    this.get_Notes()
    //this.Notes.currentView.subscribe(view => this.view = view)
  }

  // Get the Notes which are store into database
  get_Notes(){
    const user_token = this.token
    //getting data from service
    this.Notes.Get_Notes(user_token).subscribe(Note_data=>{
      this.data = Note_data
      console.log(Note_data)
    })
  }

  //for archive the Notes
  archive(note_data : any)
  {
    let data = "note_id="+note_data.note_id+"&&token="+this.token
    this.Notes.getarchive(data).subscribe()
    this.get_Notes()
    this.rout.navigate(['/dashboard/archive'])
  }

  

}


