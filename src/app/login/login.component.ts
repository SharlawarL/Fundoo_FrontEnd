import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { LoginService } from '../service/login.service'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GoogleAuthService,GoogleApiService} from "ng-gapi";
import GoogleAuth = gapi.auth2.GoogleAuth;






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
    private Auth:AuthService, 
    private router : Router, 
    private login: LoginService,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private googleAuth: GoogleAuthService
    ) { 
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
      // this.login.Social_login(this.user).subscribe(
      //     data=>{
            
      //     }
      // )
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
    console.log("Google clicked")
    this.Auth.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) =>
    {
      this.user = userData,
        console.log(this.user)
    }
    );
    // console.log('onLoadCallback');
    //   gapi.load('auth2', function() {
    //     gapi.auth2.init({
    //         client_id: '624358407601-0h4ldc7mlb8b8ijcjj4bm0g57j4qhr73.apps.googleusercontent.com',
    //         //This two lines are important not to get profile info from your users
    //         fetch_basic_profile: false,
    //         scope: 'email'
    //     });        
    //   }); 
  }
 
  // login for Facebook
  signInWithFB(): void {
    console.log("facebook clicked")
    this.Auth.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) =>
        this.user = userData
    );
  }

  // // google login
  // doGoogleLogin(){
  //   return new Promise<any>((resolve, reject) => {
  //     let provider = new firebase.auth.GoogleAuthProvider();
  //     provider.addScope('profile');
  //     provider.addScope('email');
  //     this.afAuth.auth
  //     .signInWithPopup(provider)
  //     .then(res => {
  //       resolve(res);
  //     })
  //   })
  // }
  
}
