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
  createNotesPost(title, Notes)
  {
    return this.http.post(this.notes_url+'CreateNotes/',{title,Notes},{responseType: 'text'})
  }

  // retriving Notes Data
  Get_Notes()
  {
    return this.http.get(this.notes_url+'Get_Notes/')
  }


}
