import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private _route:Router
  ) { }
  date  =  new Date().getFullYear();
  ngOnInit(): void {
  }
  logOut(){
    sessionStorage.clear()
    this._route.navigate(['/login'])
  }


}
