import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = environment.baseUrl;
  public siteUrl = 'Notes/';

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
    return this.http.post(this.baseUrl+this.siteUrl+'Create_notes/',Notes_data,{headers: header})
  }

  // retriving Notes Data
  Get_Notes(User_token : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get(this.baseUrl+this.siteUrl+'Get_notes/'+User_token,{ responseType: 'json'})
  }

  // retriving Notes Data
  Get_total_notes(User_token : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get(this.baseUrl+this.siteUrl+'Get_total_notes/'+User_token,{ responseType: 'json'})
  }

  //update notes
  Update_Notes(notes_data: any)
  {
    
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Update_notes/', notes_data,{headers: header})
  }
  //update reminder date
  Update_reminderdate(notes_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Update_reminderdate/', notes_data,{headers: header})
  }

  //update notes
  Update_notesindex(notes_data : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Update_notesindex/', notes_data,{headers: header})
  }

  changeView(view: string) {
    this.viewSource.next(view)
  }
  //add to trash
  addtrash(notes_data : any)
  {
    console.log(notes_data)
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Add_trash',notes_data,{headers: header})
  }

  //restore to trash
  restoretrash(notes_data : any)
  {
    console.log(notes_data)
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Restore_trash',notes_data,{headers: header})
  }
  //delete to trash
  deletetrash(notes_data : any)
  {
    console.log(notes_data)
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Delete_trash',notes_data,{headers: header})
  }

  //add to trash
  addarchive(notes_data : any)
  {
    console.log(notes_data)
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Add_archive/',notes_data,{headers: header})
  }

  //add to trash
  getarchive(notes_data : any)
  {
    console.log(notes_data)
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Get_archive/',notes_data,{headers: header})
  }

  //update notes background color
  Update_color(notes_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Update_color/', notes_data,{headers: header})
  }

  add_lebel(lebel_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Add_lebel/', lebel_data,{headers: header})
  }

  Get_labels(User_token : any)
  {
    return this.http.get(this.baseUrl+this.siteUrl+'Get_lebels/'+User_token,{ params:{User_token}})
  }
  addlebelnotes(lebel_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Add_lebelnotes/', lebel_data,{headers: header})
  }
  Get_labelsnote(User_token : any)
  {
    return this.http.get(this.baseUrl+this.siteUrl+'Get_lebelsnote/'+User_token,{ params:{User_token}})
  }
  removelebel(lebel_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Remove_lebel/', lebel_data,{headers: header})
  }
  delete_lebel(lebel_data: any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Delete_lebel/', lebel_data,{headers: header})
  }
  Update_lebel(lebel_data : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Update_lebel/', lebel_data,{headers: header})
  }
}
