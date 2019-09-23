import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';



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

  public form = {
    resetToken : null
  }

  constructor (
    private Auth:AuthService, private router : Router,
    private route: ActivatedRoute) { 
      route.queryParams.subscribe(
        param =>{
          this.success = param['success']   
        }
      )
    }
  ngOnInit() {
    if(this.success == null){
      this.message = "";
    }
    if(this.success == true){
        this.message ="Your email is verified... now you can login.."
    }
    if(!this.success == false){
        this.message ="Anauthorised user..."
    }
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.Auth.User_login(email,password).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        localStorage.setItem('User',myObjStr["Token"])
        localStorage.setItem('Notes_View','Grid')
        this.router.navigate(['/dashboard/notes'])
        this.Auth.setLog(true)
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
        this.Auth.setLog(false)
      }
      //console.log(data,"Data from to the server")
    })
  }
}
