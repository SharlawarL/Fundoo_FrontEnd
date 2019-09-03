import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public error = [];

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
  }

  reset_password(event){
    event.preventDefault()
    const target = event.target
    // getting value from input form
    const new_password = target.querySelector('#password').value
    const resetToken = target.querySelector('#resetToken').value

    this.Auth.reset_password(new_password,resetToken).subscribe(data=>{
      const myObjStr = JSON.parse(data);
      if(myObjStr["success"])
      {
        // this.router.navigate(['/home'])
        console.log(myObjStr,"Success")
        window.alert(myObjStr["message"])
        this.router.navigate(['/login'])
      }else{
        console.log(myObjStr,"error"),
        window.alert(myObjStr["message"])
      }
      //console.log(data,"Data from to the server")
    })
  }
}
