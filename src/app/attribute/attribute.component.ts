import { Component, OnInit, ViewChild } from '@angular/core';
import { AttributeService } from '../services/attribute.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MediaObserver } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AttributeAddComponent } from '../attribute-add/attribute-add.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  @ViewChild(MatSort) Sort: MatSort
  @ViewChild(MatPaginator) Paginator: MatPaginator
  constructor(
    private _snackbar: MatSnackBar,
    private _route: Router,
    private _dialog: MatDialog,
    private _attributeService:  AttributeService,
    private _media: MediaObserver
  ) { }
  attributes:any
  attributeColumns:string[] = ["attribute","_id"]
  dataSource:MatTableDataSource<any>   = new MatTableDataSource([])
  attribute:any
  screensize:any
  ngOnInit(): void {
    this._attributeService.getAttributes().subscribe( res => {
      this.attributes = res
      this.dataSource.data = this.attributes 
      this.dataSource.sort = this.Sort 
      this.dataSource.paginator = this.Paginator 
    })
    this._media.media$.subscribe(screensize => {
      this.screensize = screensize.mqAlias
    })
  }
  openAdd(){
    this._dialog.open(AttributeAddComponent)
  }

  openList(id,attribute){
    this._route.navigate(['/attribute-list',attribute,id])
  }

  onDelete(id){
    this._attributeService.deleteAttribute(id).subscribe(res => {
      let msg = 'Attribute Successfully Deleted.'
      let type = true
      this.openSnackbar(msg,type)
      setTimeout(() => {
        window.location.reload()
      },1000)
    },err => {
      let msg = 'Action Unsuccesful.'
      let type = false
      this.openSnackbar(msg,type)
      setTimeout(() => {
        window.location.reload()
      },1000)
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
