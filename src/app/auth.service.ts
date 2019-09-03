import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private site_url = "http://localhost/Fundoo_BackEnd/Home/";

  private header = new HttpHeaders({'Content-Type': 'application/json'});

  Log_In = false;

  constructor(
    //instance for http client
    private http: HttpClient
  ) { 
    
  }

  setLog(value: boolean){
    this.Log_In = value
  }
  get get_log(){
    return this.Log_In
  }

  //The method for login user and parameters are email and password
  User_login(email,password){

    // http post request to codeigniter for login
    return this.http.post(this.site_url+'login',{email,password},{responseType: 'text'});
  }

  //the  method for the register user
  User_register(firstname,lastname,email,password,passwordcc){
    // http post request to codeigniter for register user
    return this.http.post(this.site_url+'Register/',{
      firstname,
      lastname,
      email,
      password,
      passwordcc
    },
    {responseType: 'text'})
  }

  //the method for the forgot password
  forgot_password(firstname,email){
    ///http post request to codeignitor for forgot_password
    return this.http.post(this.site_url+'Apply_forgot/',{
      firstname,
      email
    },
    {responseType: 'text'})
  }

  //the method for the reset password
  reset_password(new_password,resetToken){
    //http post request to the codeignitor for reset_password
    return this.http.post(this.site_url+'Reset_password/',{
      new_password,
      resetToken
    },
    {responseType: 'text'})
  }

  createNotes(title,notes){
    return this.http.post(this.site_url,{
      title,notes
    })
  }
}
