import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  category:any
  categoryColumns:String[] = ['category','status','_id']
  status:any
  screensize:any
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  constructor(
    private _dialog:MatDialog,
    private _media: MediaObserver,
    private _snackbar: MatSnackBar,
    private _categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this._categoryService.getCategory().subscribe( result => {
      this.dataSource.data = result
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
    this._media.media$.subscribe(
      (change)=>{
        this.screensize = change.mqAlias;
    })
  }

  onAdd(category,status){
    if(category === "" || status === "" || category === undefined || status === undefined ){
      let msg = "Empty Text Fields."
      let type = false
      this.openSnackbar(msg,type)
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }
    else{
      this._categoryService.addCategory(category,status).subscribe( res => { 
        if(res){
          let msg = "Category Successfully Added."
          let type = true
          this.openSnackbar(msg,type)
          setTimeout(()=>{
            window.location.reload()
          },1000)
        }
      },err => {
        if(err){
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

  onEdit(category,status,id){
    this._dialog.open(CategoryEditComponent,{
      data:{
        id:id,
        category:category,
        status:status
      }
    })
  }

  onDelete(id){
    this._categoryService.deleteCategory(id).subscribe( res => {
      if(res){
        let msg = " Successfully Deleted."
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
  setSize(){
    if(this.screensize  == 'md'||this.screensize  == 'sm' || this.screensize  == 'xs'){
      return true
    }else return  false
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
