import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../services/attribute.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-attribute-add',
  templateUrl: './attribute-add.component.html',
  styleUrls: ['./attribute-add.component.scss']
})
export class AttributeAddComponent implements OnInit {

  constructor(
    private _snackbar: MatSnackBar,
    private _attributeService:AttributeService
  ) { }
  attribute:any
  ngOnInit(): void {
  }

  onAdd(attribute){
    this._attributeService.addAttribute(attribute).subscribe(res => {
      let msg = attribute +' Successfully Added.'
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
