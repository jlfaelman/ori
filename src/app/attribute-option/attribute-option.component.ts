import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeService } from '../services/attribute.service';

@Component({
  selector: 'app-attribute-option',
  templateUrl: './attribute-option.component.html',
  styleUrls: ['./attribute-option.component.scss']
})
export class AttributeOptionComponent implements OnInit {

  constructor(
    private _snackbar: MatSnackBar,
    private _attributeService: AttributeService,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {this.attribute = data }
  option:any
  attribute:any
  ngOnInit(): void {
  }

  onAdd(id,attribute,option){
    if(attribute === "" || option === "" || attribute === undefined || option === undefined ){
      let msg = "Empty Text Fields."
      let type = false
      this.openSnackbar(msg,type)
    }else{
      this._attributeService.addOption(id,attribute,option).subscribe(res => {
        let msg = option +' Successfully Added.'
        let type = true
        this.openSnackbar(msg,type)
        setTimeout(() => {
          window.location.reload()
        },1000)
      },err => {
        let msg = 'Action Unsuccessful.'
        let type = false
        this.openSnackbar(msg,type)
        setTimeout(() => {
          window.location.reload()
        },1000)
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
