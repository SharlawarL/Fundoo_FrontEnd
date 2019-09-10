import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
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
  public success = "lalit";
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
    if(this.success){
            this.message ="Your email is verified... now you can login.."
    }
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    this.Auth.User_login(email,password).subscribe(data=>{
      console.log(data)
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr["message"])
        localStorage.setItem('User',myObjStr["Token"])
        localStorage.setItem('Notes_View','Grid')
        this.router.navigate(['/dashboard'])
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
