import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  params : object;
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor() { }

  ngOnInit() {
this.myParams = {
      particles: {
          number: {
              value: 100,
          },  
          color: {
              value: '#ff0000'
          },
          shape: {
              type: 'circle',
          },
      },
      interactivity:{
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          }
      }
    }
};
  }

}
