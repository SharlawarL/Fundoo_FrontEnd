import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public error = [];
  public User_check = String

  private check_Password = "";
  private check_Passwordcc = "";

  public form = {
    resetToken : null
  }

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private Auth:AuthService
  ) { 
    route.queryParams.subscribe(
      param =>{
        this.form.resetToken = param['token']
      }
    )
  }

  ngOnInit() {
    this.Auth.check_User(this.form.resetToken).subscribe(Response=>{
      const User_check = JSON.parse(Response)
      console.log(User_check)
    })
  }

  reset_password(event){
    event.preventDefault()
    const target = event.target
    // getting value from input form
    const new_password = target.querySelector('#password').value
    const new_passwordcc = target.querySelector('#passwordcc').value
    const resetToken = target.querySelector('#resetToken').value

    this.Auth.reset_password(new_password,new_passwordcc,resetToken).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr,"Success")
        window.alert(myObjStr["message"])
        this.router.navigate(['/login'])
      }else{
        //console.log(myObjStr,"error")
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
