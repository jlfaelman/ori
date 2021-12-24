import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  categoryData:any
  constructor(
    private _snackbar: MatSnackBar,
    private _categoryService:CategoryService,
    @Inject(MAT_DIALOG_DATA) data:any
  ) { this.categoryData = data }

  ngOnInit(): void {

  }
  onSubmit(category,status,id){
    if(category === "" || status === "" || category === undefined || status === undefined ){
      let msg = "Empty Text Fields."
      let type = false
      this.openSnackbar(msg,type)
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }
    else{
      this._categoryService.editCategory(category,status,id).subscribe( res => {
        if(res){
          let msg = "Category Successfully Edited."
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
