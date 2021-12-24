import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OriSystem';
  constructor(public _route: Router){}

  date  =  new Date().getFullYear();

  logOut(){
    this._route.navigate(['/login'])
  }



}
