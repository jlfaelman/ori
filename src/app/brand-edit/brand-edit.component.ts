import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandService } from '../services/brand.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnInit {
  brandData:any
  constructor(
    private _brandService:BrandService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data:any
    ) { this.brandData = data }
  ngOnInit(): void {
  }
  onSubmit(brand,status,id){
    this._brandService.editBrand(brand,status,id).subscribe( res => {
      if(res){
        let msg = "Brand Successfully Edited."
        let type = true
        this.openSnackbar(msg,type)
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }
    },err => {
      if(err){
        console.log(err)
        let msg = "Action Unsuccessful."
        let type = false
        this.openSnackbar(msg,type)
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }
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
