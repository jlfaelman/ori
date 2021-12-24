import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BrandService } from '../services/brand.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { BrandEditComponent } from '../brand-edit/brand-edit.component';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  brand:any
  brandColumns:String[] = ['brand','status','_id']
  status:any
  screensize:any
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  constructor(
    private _brandService:BrandService,
    private _dialog:MatDialog,
    private _media: MediaObserver,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._brandService.getBrand().subscribe( result => {
      this.dataSource.data = result
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      console.log(this.dataSource.data.length)
    })
    this._media.media$.subscribe(
      (change)=>{
        this.screensize = change.mqAlias;
    })
  }
  onAdd(brand,status){
    if(brand === "" || status === "" || brand === undefined || status === undefined ){
      let msg = "Empty Text Fields."
      let type = false
      this.openSnackbar(msg,type)
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }
    else{
      this._brandService.addBrand(brand,status).subscribe( res => {
        if(res){
          let msg = "Brand Successfully Added."
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

  onEdit(brand,status,id){
    this._dialog.open(BrandEditComponent,{
      data:{
        id:id,
        brand:brand,
        status:status
      }
    })
  }

  onDelete(id){
    this._brandService.deleteBrand(id).subscribe( res => {
      if(res){
        let msg = "Brand Succesfully Deleted."
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
