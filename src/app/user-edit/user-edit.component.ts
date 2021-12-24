import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userData:any;

  constructor(
    
    private _userService: UserService,
    private _snackbar: MatSnackBar,
    public DialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) user:any) { 
    this.userData = user
  }

  ngOnInit(): void {
  }

  onUpdate(id,email,first,last,pass,confirmpass){
   
    if( email == '' || first == '' || last == ''|| pass == '' || confirmpass == ""){
      let msg = "Text Fields Can't Be Empty."  
        let type = true
        this.openSnackbar(msg,type)
    }
    if(pass === confirmpass){
      this._userService.updateUser(id,email,first,last,pass).subscribe(result=>{
        let msg = "User Updated Successfully."
        let type = true
        this.openSnackbar(msg,type)
        setTimeout(()=>{
          window.location.reload()
        },1000)
      },err=>{
        let msg = "User Deleted Successfully."
        let type = true
        this.openSnackbar(msg,type)
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }) 
    }else{
        let msg = "Passwords Doesn't Match."   
        let type = true
        this.openSnackbar(msg,type)  
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
