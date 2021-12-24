import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Store } from '../interface/store';
import{ MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.scss']
})

export class StoreEditComponent implements OnInit {
  Storedata;
  constructor(
        private _snackbar:MatSnackBar,
        private _storeService: StoreService,
        public DialogRef: MatDialogRef<StoreEditComponent>,
        @Inject(MAT_DIALOG_DATA) store) {
        this.Storedata = store
        }

  ngOnInit(): void {
  }

  onSubmit(store,status,id){
    this._storeService.updateStore(id,store,status).subscribe(res=>{
      let msg = "Store Updated Successfully."
      let type = true
      this.openSnackbar(msg,type)
    },err=>{
      let msg = "Invalid Text Fields."
      let type = false
      this.openSnackbar(msg,type)
     })
     setTimeout(()=>{
      window.location.reload()
    },1000)
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
