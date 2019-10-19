import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public check_firstname = null;
  public check_lastname = null;
  public check_Email = null;
  public check_Password = null;
  public check_Passwordcc = null;
  public firstname_box = "silver";
  public lastname_box = "silver";
  public email_box = "silver";
  public pass_box = "silver";
  public cpass_box = "silver";
  constructor(private Auth:AuthService, private router : Router) { }

  ngOnInit(): void {
    
  
  }

  registerUser(event){
    event.preventDefault()
    const target = event.target
    const firstname = target.querySelector('#firstname').value
    const lastname = target.querySelector('#lastname').value
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value
    const passwordcc = target.querySelector('#passwordcc').value

    this.Auth.User_register(firstname,lastname,email,password,passwordcc).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr,"Success")
        window.alert("Your are successfully registered... please check mail to verify... then log IN..");
        this.router.navigate(['/'])
      }else{
        console.log(myObjStr,"error")
        // If error value will be return
        // for first name
        if(myObjStr["firstname"]){
          this.check_firstname = myObjStr["firstname"];
          this.firstname_box = "red";
        }else{
          this.check_firstname = "";
          this.firstname_box = "silver";
        }
        //for last name
        if(myObjStr["lastname"]){
          this.check_lastname = myObjStr["lastname"];
          this.lastname_box = "red";
        }else{
          this.check_lastname = "";
          this.lastname_box = "silver";
        }
        //for email
        if(myObjStr["email"]){
          this.check_Email = myObjStr["email"];
          this.email_box = "red";
        }else{
          this.check_Email = "";
          this.email_box = "silver";
        }
        //for password
        if(myObjStr["password"]){
          this.check_Password = myObjStr["password"];
          this.pass_box = "red";
        }else{
          this.check_Password = "";
          this.pass_box = "silver";
        }

        //for conform password
        if(myObjStr["passwordcc"]){
          this.check_Passwordcc = myObjStr["passwordcc"];
          this.cpass_box = "red";
        }else{
          this.check_Passwordcc = "";
          this.cpass_box = "silver";
        }
      }
      //console.log(data,"Data from to the server")
    })
  }
}
