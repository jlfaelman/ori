import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from '../services/store.service';
import { Store } from '../interface/store';
@Component({
  selector: 'app-store-dialog',
  templateUrl: './store-dialog.component.html',
  styleUrls: ['./store-dialog.component.scss']
})
export class StoreDialogComponent implements OnInit {

  constructor(
    private _snackbar: MatSnackBar,
    private _storeService: StoreService
  ) { }

  store= {store:"", status:""}; 
  
  ngOnInit(): void {
   
  }
  onSubmit():void{
    this._storeService.addStore(this.store).subscribe(
      res=>{
        let msg = "Store Added Succesfully."
        let type = true
        this.openSnackbar(msg,type)
      },err=>{
        let msg = "Action Unsuccessful."
        let type = false
        this.openSnackbar(msg,type)
      })

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
