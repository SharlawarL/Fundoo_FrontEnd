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
import { trigger, state, style, animate, transition } from '@angular/animations';
declare const changeSide: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
      })),
      state('final', style({
        transform: 'rotateY(180deg)',
        display: 'none'
      })),
      state('rinitial', style({
        transform: 'rotateY(90deg)',
        display: 'none'
      })),
      state('rfinal', style({
        transform: 'rotateY(0deg)',
        display: 'block'
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms')),
      transition('rinitial=>rfinal', animate('1500ms')),
      transition('rfinal=>rinitial', animate('1000ms'))
    ]),
  ]
})
export class LoginComponent implements OnInit {

  public Email = null;
  public Password = null;
  public Email_box_color = "silver";
  public pass_box_color = "silver";
  public success : boolean;
  public message = "";
  public user: SocialUser;
  public userdata: any;
  public social : string;
  currentState = 'initial';
  registerState = 'rinitial';

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
    let user_data = "email="+target.querySelector('#email').value+"&&password="+target.querySelector('#password').value
    this.login.User_login(user_data).subscribe((res: Response) => {
      console.log(res)
      if(res["success"])
      {
        localStorage.setItem('User',res["Token"])
        localStorage.setItem('Notes_View','Grid')
        this.router.navigate(['/dashboard/notes'])
        this.login.setLog(true)
      }else{
        console.log(res["message"])
        
        // If error value will be return
        if(res["email"]){
          this.Email = res["email"];
          this.Email_box_color = "red"
        }else{
          this.Email = "";
          this.Email_box_color = "silver"
        }
        if(res["password"]){
          this.Password = res["password"];
          this.pass_box_color = "red"
        }else{
          this.Password = "";
          this.pass_box_color = "silver"
        }
        this.login.setLog(false)
      }
    })
  }
 
  // login for Facebook
  signInWithFB(): void {
    this.Auth.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) =>
        {
          let s_data = "social=Facebook&&email="+userData.email+"&&photo="+userData.photoUrl+"&&firstname="+userData.firstName+"&&lastname="+userData.lastName
          this.social_login(s_data)
        }
    );
  }

  //login from Google
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.userdata = credential.additionalUserInfo.profile
        let s_data = "social=Google&&email="+this.userdata.email+"&&photo="+this.userdata.picture+"&&firstname="+this.userdata.given_name+"&&lastname="+this.userdata.family_name
        this.social_login(s_data)
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
        this.userdata = credential.additionalUserInfo.profile
        var udata = this.userdata.name.split(" ")
        let s_data = "social=Twitter&&email="+this.userdata.screen_name+"&&photo="+this.userdata.profile_image_url+"&&firstname="+udata[0]+"&&lastname="+udata[1]
        this.social_login(s_data)
      })
  }
  
  // social login to data base
  social_login(userData)
  {
    this.login.Social_login(userData).subscribe((res: Response) => {
        localStorage.setItem('User',res["Token"])
        localStorage.setItem('Notes_View','Grid')
        this.router.navigate(['/dashboard/notes'])
        this.login.setLog(true)
    })
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    this.registerState = this.registerState === 'rinitial' ? 'rfinal' : 'rinitial';
  }
  flipped = false;
  imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkL8GlKZ775j3f0VVgS1rU8L2LoX5UEM6fKv_eGLzeza27WYH"

  flipIt() {
    this.flipped = !this.flipped;
  }
  
}
