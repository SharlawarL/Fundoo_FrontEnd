import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private pop = true;

  constructor() { }

  ngOnInit() {
  }

  popUp(){
    this.pop = false;
  }
  popClose(){
    this.pop = true;
  }

}
