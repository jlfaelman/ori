import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { AttributeService } from '../services/attribute.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttributeOptionComponent } from '../attribute-option/attribute-option.component';
@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  dataSource:MatTableDataSource<any> = new MatTableDataSource([])
  attributes:any
  id:any
  attribute:any
  title:any
  screensize:any
  constructor(
    private _attributeService: AttributeService,
    private _activatedroute: ActivatedRoute,
    private _location: Location,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog,
    private _media: MediaObserver
    ) {
   }
  selectionColumns:any = ['option','_id']
  ngOnInit(): void {
    this.id = this._activatedroute.snapshot.paramMap.get('id')
    this.attribute = this._activatedroute.snapshot.paramMap.get('attribute')
    this.title = this.attribute
    this._attributeService.getArray(this.attribute,this.id).subscribe(res => {
        this.attributes = res
        this.dataSource.data = this.attributes
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator

    },err => {
       console.log(err)
    })
    this._media.media$.subscribe(screensize => {
      this.screensize = screensize.mqAlias
    })
  }
  onBack(){
    this._location.back();
  }

  
  onDelete(attr,attrid,id,option){
    this._attributeService.deleteOption(attrid,attr,id,option).subscribe( res =>{
     if(res){
       let msg = option+" Succesfully Deleted."
       let type = true
       this.openSnackbar(msg,type)
      setTimeout(() => {
        window.location.reload()
      },1000)
     }
    },err =>{
      let msg = " Action Unsuccessful."
      let type = false
      this.openSnackbar(msg,type)
      setTimeout(() => {
        window.location.reload()
      },1000)
   })
  }
  onAdd(id,attribute){
    this._dialog.open(AttributeOptionComponent,{
      data:{
        id:id,
        attribute:attribute,
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
