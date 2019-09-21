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

  private check_firstname = "";
  private check_lastname = "";
  private check_Email = "";
  private check_Password = "";
  private check_Passwordcc = "";


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
          //this.box_color = "red"
        }else{
          this.check_firstname = "";
        }
        //for last name
        if(myObjStr["lastname"]){
          this.check_lastname = myObjStr["lastname"];
          //this.box_color = "red"
        }else{
          this.check_lastname = "";
        }
        //for email
        if(myObjStr["email"]){
          this.check_Email = myObjStr["email"];
          //this.box_color = "red"
        }else{
          this.check_Email = "";
        }
        //for password
        if(myObjStr["password"]){
          this.check_Password = myObjStr["password"];
        }else{
          this.check_Password = "";
        }

        //for conform password
        if(myObjStr["passwordcc"]){
          this.check_Passwordcc = myObjStr["passwordcc"];
        }else{
          this.check_Passwordcc = "";
        }
      }
      //console.log(data,"Data from to the server")
    })
  }
}
