import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes_url = "http://localhost/Fundoo_BackEnd/Notes/";

  private viewSource = new BehaviorSubject('Grid');
  currentView = this.viewSource.asObservable();

  constructor(
    //instance for http client
    private http: HttpClient
  ) { 
  }

  // creating Notes
  createNotesPost(Notes_data : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.notes_url+'Create_notes/',Notes_data,{headers: header})
  }

  // retriving Notes Data
  Get_Notes(User_token : any)
  {
    return this.http.get(this.notes_url+'Get_notes/'+User_token,{ params:{User_token}})
  }

  //update notes
  Update_Notes(Notes_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.notes_url+'Update_notes/', Notes_data,{headers: header})
  }

  //update notes
  Update_notesindex(Notes_data : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.notes_url+'Update_notesindex/', Notes_data,{headers: header})
  }

  changeView(View: string) {
    this.viewSource.next(View)
  }
}
