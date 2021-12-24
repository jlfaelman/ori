import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '../interface/store';
import { StoreService } from '../services/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { WindowService } from '../services/window.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StoreDialogComponent } from '../store-dialog/store-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreEditComponent } from '../store-edit/store-edit.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, AfterViewInit{

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  mediaSub: Subscription;
  constructor(
    private _snackbar: MatSnackBar,
    private _matDialog: MatDialog,
    private _mediaObserver: MediaObserver,
    private _storeService: StoreService,
    private _windowService: WindowService,
    ) { }

  hiddenTag: boolean = true;
  storelist: Store[];
  dataSource: MatTableDataSource<Store> = new MatTableDataSource([]);
  displayedColumns: string[] = ['store','status','_id' ]
  screensize:any;
 editable:Boolean = true;
  
  ngOnInit(): void {
    this._storeService.getStore().subscribe(stores=>{
      this.storelist = stores;
      this.dataSource.data = this.storelist
    })
    this.mediaSub = this._mediaObserver.media$.subscribe(
      (change: MediaChange)=>{
        this.screensize = change.mqAlias;
      })
    
    
  }
  onFilter(value:string){
    this.dataSource.filter = value.trim().toLowerCase()
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


 openUpdate(store,status,id){
  let dialogRef = this._matDialog.open(StoreEditComponent,{
    data: {
      _id:id,
      store:store,
      status:status
    }
  })


  }
  deleteStore(id){
    this._storeService.deleteStore(id).subscribe(res=>{
      let msg = "Store Deleted Succesfully."
      let type = true
      this.openSnackbar(msg,type)
      setTimeout(()=>{
        window.location.reload()
      },3000)
      
    },err=>{
      let msg = "Action Unsuccessful."
      let type = false
      this.openSnackbar(msg,type)
    })
  }
  ngAfterViewInit():void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setSize(){
    if(this.screensize  == 'md'||this.screensize  == 'sm' || this.screensize  == 'xs'){
      return true
    }else return  false
  }

  openAdd():void{
    this._matDialog.open(StoreDialogComponent)
  }

}
