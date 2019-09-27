import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  public siteUrl = 'User/';

  private header = new HttpHeaders({'Content-Type': 'application/json'});

  Log_In = false;

  constructor(
    //instance for http client
    private http: HttpClient
  ) { }

  //The method for login user and parameters are email and password
  User_login(email,password){

    // http post request to codeigniter for login
    return this.http.post(this.baseUrl+this.siteUrl+'Login',{email,password},{responseType: 'text'});
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
    return this.http.post(this.baseUrl+this.siteUrl+'Social/',login_data,{headers: header})
  }
}
