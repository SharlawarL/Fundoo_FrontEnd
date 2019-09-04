import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private site_url = "http://localhost/Fundoo_BackEnd/Notes/";

  constructor(
    //instance for http client
    private http: HttpClient
  ) { 
    
  }

  // creating Notes
  createNotesPost(title, notes)
  {
    return this.http.post(this.site_url+'CreateNotes/',{title,notes},{responseType: 'text'})
  }

  // retriving Notes Data
  Get_Notes()
  {
    return this.http.get(this.site_url+'Get_Notes/')
  }


}
