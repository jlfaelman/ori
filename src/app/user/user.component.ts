import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interface/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { MediaObserver } from '@angular/flex-layout';
import { throwError } from 'rxjs';
import { UserEditComponent } from '../user-edit/user-edit.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _snackbar: MatSnackBar,
    private _userService: UserService,
    private _dialog: MatDialog,
    private _mediaObserver: MediaObserver
  ) { }
  userColumns:string[] = ['firstname','lastname','email','_id']
  user: User = {email:"", password:"",lastname:"",firstname:"" }
  userDataSource:MatTableDataSource<User> = new MatTableDataSource()
  userTable: User[]
  confirmpass:String
  screensize:any
  ngOnInit(): void {
    this._userService.getUsers().subscribe(res=>{
      this.userTable = res
      this.userDataSource.data = this.userTable
      this.userDataSource.sort = this.sort
      this.userDataSource.paginator = this.paginator
    },err=>{
      console.error(err)
    })
    this._mediaObserver.media$.subscribe(size=>{
      this.screensize = size.mqAlias
    })
  }

  deleteUser(id){
    console.log(id)
    this._userService.deleteUser(id).subscribe(res=>{
      console.log(res)
      let msg = "User Deleted Successfully."
      let type = true
      this.openSnackbar(msg,type)
      setTimeout(()=>{
        window.location.reload()
      },1000)
    })
  }
  openEdit(id,email,first,last,pass,confirmpass){
    this._dialog.open(UserEditComponent,{
      data:{
        _id: id,
        email: email,
        password:pass,
        firstname:first,
        lastname:last,
        confirm: confirmpass
      }
    })
  }

  addUser(email,first,last,pass,confirm){
    let userCred: User = {email:email, password:pass,lastname:last, firstname:first }
    if(pass !== confirm){
      let msg = "Password doesn't Match!"
      let type = false
      this.openSnackbar(msg,type)
      this.user = {email:email, password:"",lastname:last,firstname:first }
      this.confirmpass = ""
    }
    else{
      if( userCred.email==="" ||userCred.password===""|| userCred.firstname==="" || userCred.lastname==="" || 
      userCred.email=== undefined ||userCred.password===undefined|| userCred.firstname===undefined || userCred.lastname=== undefined){
        let msg = "Text Fields Invalid."
        let type = false
        this.openSnackbar(msg,type)
      }else{
        this._userService.addUser(userCred).subscribe(res=>{
          let msg = "User Added Successfully."
          let type = true
          this.openSnackbar(msg,type)
          setTimeout(()=>{
            window.location.reload()
          },1000)
        },err=>{
          let type = false
          this.openSnackbar(err.error,type)
          this.user = {email:"", password:"",lastname:"",firstname:"" }
        })
      }
    } 
  }

  onFilter(value):void{
    this.userDataSource.filter = value.trim().toString()
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

  setSize():any{
    if(this.screensize === 'lg' || this.screensize === 'xl' ){
      return true
    }else return false
  }
}
