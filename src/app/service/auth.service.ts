import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user_site = "http://localhost/Fundoo_BackEnd/User/";

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
    return this.http.post(this.user_site+'Login',{email,password},{responseType: 'text'});
  }

  //the  method for the register user
  User_register(firstname,lastname,email,password,passwordcc){
    // http post request to codeigniter for register user
    return this.http.post(this.user_site+'Register/',{
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
    return this.http.post(this.user_site+'Apply_forgot/',{
      firstname,
      email
    },
    {responseType: 'text'})
  }

  //the method for the reset password
  reset_password(password,passwordcc,resetToken){
    //http post request to the codeignitor for reset_password
    return this.http.post(this.user_site+'Reset_password/',{
      password, passwordcc,resetToken
    },
    {responseType: 'text'})
  }

  //check valid user in reset password
  check_User(token){
      return this.http.post(this.user_site+'check_reset_token/',{token},{responseType:'text'})
  }

  //get the user details
  Get_User(token)
  {
    return this.http.get(this.user_site+'Get_user',{params:{token}})
  }

  ViewChange()
  {
    
  }
}
