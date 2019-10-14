import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap, map} from 'rxjs/operators';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl : String = environment.baseUrl
  public siteUrl = 'User/';

  private header = new HttpHeaders({'Content-Type': 'application/json'});

  Log_In = false;

  user: Observable<User>;

  constructor(
    //instance for http client
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { 
  }

  //The method for login user and parameters are email and password
  User_login(user_data :any){

    // http post request to codeigniter for login
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Login',user_data,{headers: header});
  }
  
  setLog(value: boolean){
    this.Log_In = value
  }
  get get_log(){
    return this.Log_In
  }

  // for social login
  Social_login(login_data : any)
  {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.baseUrl+this.siteUrl+'Social_login/',login_data,{headers: header})
  }
}
