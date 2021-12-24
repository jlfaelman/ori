import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MediaObserver } from '@angular/flex-layout';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { R3TargetBinder } from '@angular/compiler';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  screensize:any
  storeData:any
  brandData:any
  categoryData:any
  attributeData:any
  imgURL
  imgMsg
  selectedImage:File
  fd = new FormData
/* Initialization of Form */
 
  attributes:any[] =[]
  name:string
  productForm = new FormGroup({
    productname:new FormControl(),
    brand: new FormControl(),
    sku:new FormControl(),
    price:new FormControl(),
    quantity:new FormControl(),
    store:new FormControl(),
    category:new FormControl(),
    description:new FormControl()
  })


  constructor(
    private _productService: ProductService,
    private _route:Router,
    private _snackbar:MatSnackBar,
    private _media: MediaObserver
  ) { }

  ngOnInit(): void {
    this._media.media$.subscribe(screen => {
      this.screensize = screen.mqAlias
    })

    /* Store  List */
    this._productService.getStore().subscribe(res => {
      this.storeData = res
    })

     /* Brand  List */
     this._productService.getBrand().subscribe(res => {
      this.brandData = res
    })
     /* Category  List */
     this._productService.getCategory().subscribe(res => {
      this.categoryData = res
    }) 
    /* Attributes  List */
    this._productService.getAttributes().subscribe(res => {
      this.attributeData = res
    }) 
  }

  onClick(){
    
  }

  onSelectedImage(e):void{
    this.selectedImage = e.target.files[0]
    this.imgMsg = this.selectedImage.name
    let reader = new FileReader()
    reader.readAsDataURL(this.selectedImage)
    reader.onload = (_e) => {
      this.imgURL = reader.result
      console.log(_e)
    }
    console.log(this.selectedImage)
    

  }

  addAttribute(option):void{
    let attribute ={
      attribute:option
    }
    this.attributes.push(attribute)

  }

  onSubmit(){
    let name  = this.productForm.get('productname').value
    let formData = new FormData()
    formData.append('image', this.selectedImage)
    formData.append('name',this.productForm.get('productname').value)
    formData.append('sku',this.productForm.get('sku').value)
    formData.append('quantity',this.productForm.get('quantity').value)
    formData.append('price',this.productForm.get('price').value)
    formData.append('brand',this.productForm.get('brand').value)
    formData.append('store',this.productForm.get('store').value)
    formData.append('category',this.productForm.get('category').value)
    formData.append('description',this.productForm.get('description').value)
    console.log(this.productForm.value)

    this._productService.insertProduct(formData).subscribe( res => {
      let msg = `${name} Added Successfully`
      let type = true
      this.openSnackbar(msg,type)
        setTimeout(()=>{
          window.location.reload()
        },1000)
    },err => {
      let msg = `Action Unsuccessful.`
      let type = false
      this.openSnackbar(msg,type)
        setTimeout(()=>{
          window.location.reload()
        },1000)
    })

  }



  onClear():void{
 
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
