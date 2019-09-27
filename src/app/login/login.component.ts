import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { LoginService } from '../service/login.service'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private Email ="";
  private Password ="";
  private box_color = "silver";
  public success : boolean;
  public message = "";
  private user: SocialUser;
  private loggedIn: boolean;

  public form = {
    resetToken : null
  }

  constructor (
    private Auth:AuthService, private router : Router, private login: LoginService,
    private route: ActivatedRoute) { 
      route.queryParams.subscribe(
        param =>{
          this.success = param['success']   
        }
      )
    }
  ngOnInit() {

    this.Auth.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
      this.login.Social_login(this.user).subscribe(
          data=>{
            
          }
      )
    });
    
  }

  //login for user from site registered
  loginUser(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.login.User_login(email,password).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        localStorage.setItem('User',myObjStr["Token"])
        localStorage.setItem('Notes_View','Grid')
        this.router.navigate(['/dashboard/notes'])
        this.login.setLog(true)
      }else{
        console.log(myObjStr["message"])
        
        // If error value will be return
        if(myObjStr["email"]){
          this.Email = myObjStr["email"];
          //this.box_color = "red"
        }else{
          this.Email = "";
        }
        if(myObjStr["password"]){
          this.Password = myObjStr["password"];
        }else{
          this.Password = "";
        }
        this.login.setLog(false)
      }
      //console.log(data,"Data from to the server")
    })
  }

  // login for Google
  signInWithGoogle(): void {
    this.Auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  // login for Facebook
  signInWithFB(): void {
    this.Auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
