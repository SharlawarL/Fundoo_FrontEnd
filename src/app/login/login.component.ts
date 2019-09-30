import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { LoginService } from '../service/login.service'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

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
  public userdata: any;
  public social : string;

  public form = {
    resetToken : null
  }

  constructor (
    private Auth:AuthService, 
    private router : Router, 
    private login: LoginService,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth
    ) {
    }
  ngOnInit() {

    
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
 
  // login for Facebook
  signInWithFB(): void {
    this.Auth.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) =>
        {
          this.social = "Facebook"
          this.user = userData
          this.social_login(this.social,this.user)
        }
    );
  }

  //login from Google
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.social = "Google"
        this.userdata = credential.additionalUserInfo.profile
        this.social_login(this.social,this.userdata)
      })
  }

  //login from facebook
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
  }

  //twitter login
  twitterLogin()
  {
    const provider = new  auth.TwitterAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.social = "Twitter"
        this.userdata = credential.additionalUserInfo.profile
        this.social_login(this.social,this.userdata)
      })
  }
  
  // social login to data base
  social_login(company: string, userData: any)
  {
    return this.login.Social_login(company,userData).subscribe(
      data=>
      {
        console.log("Successfully")
      }
    )
  }
  
}
