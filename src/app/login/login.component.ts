import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService}  from '../services/user.service' 
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private  _snackbar:MatSnackBar,
    private _route: Router,
    private _userService:UserService
    ) { }
  token:any;
  user = {email:"",password:""}
  date  =  new Date().getFullYear();
  ngOnInit(): void {
  }

  onLogin(email, password){
    let userCred = {email: email, password: password}
    if(email == "" || password == ""){
      let msg = "Invalid Empty Fields !"
      let type = false
      this.openSnackbar(msg,type)
       
    }else{
      this._userService.loginUser(userCred).subscribe(res=>{
        sessionStorage.setItem('token',res.token)
        let msg = 'Authentication Success.'
        let type = true
        this.openSnackbar(msg,type)
        this._route.navigate(['/dashboard'])
      },err=>{
        let msg = 'Authentication Failed.'
        let type = false
        this.openSnackbar(msg,type)
      })
    }
  }
  openSnackbar(message,type){
    let Class = ''
    if(type == true ){ Class = 'success'}
    if( type == false) { Class = 'error'}
    this._snackbar.open(message,"X",{
      duration:3000,
      verticalPosition:'top',
      panelClass:[`${Class}`]})
  }
}
