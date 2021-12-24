import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productData:MatTableDataSource<any> = new MatTableDataSource()
  dataSource:any
  productColumns = ['name','sku','brand','price','store','quantity','category','_id']
  constructor(
    
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe( res => {
      this.dataSource = res
      this.productData = this.dataSource
      console.log(this.productData)
    },err => {
      console.error(err)
    })
  }

}
