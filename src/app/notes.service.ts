import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes_url = "http://localhost/Fundoo_BackEnd/Notes/";

  constructor(
    //instance for http client
    private http: HttpClient
  ) { 
  }

  // creating Notes
  createNotesPost(Notes_data)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.notes_url+'CreateNotes/',Notes_data,{headers: header})
  }

  // retriving Notes Data
  Get_Notes(user_token)
  {
    return this.http.get(this.notes_url+'Get_Notes?token='+user_token)
  }

  //update notes
  Update_Notes(Notes_data)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.notes_url+'Update_Notes/', Notes_data,{headers: header})
  }


}
