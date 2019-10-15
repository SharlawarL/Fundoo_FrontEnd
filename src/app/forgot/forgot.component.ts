import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  public check_firstname = "";
  public check_email = "";

  constructor(private Auth:AuthService, private router : Router) { }

  ngOnInit() {
  }

  forgot(event){
    event.preventDefault()
    const target = event.target
    const firstname = target.querySelector('#firstname').value
    const email = target.querySelector('#email').value

    this.Auth.forgot_password(firstname,email).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        window.alert('Check mail for reset password link...')
        this.router.navigate(['/'])
        console.log(myObjStr,"Success")
      }else{
        console.log(myObjStr,"error")
       // window.alert(myObjStr["message"])
       // If error value will be return
        // for first name
        if(myObjStr["firstname"]){
          this.check_firstname = myObjStr["firstname"];
          //this.box_color = "red"
        }else{
          this.check_firstname = "";
        }
        //for last name
        if(myObjStr["email"]){
          this.check_email = myObjStr["email"];
          //this.box_color = "red"
        }else{
          this.check_email = "";
        }
      }
      //console.log(data,"Data from to the server")
    })
  }
}
