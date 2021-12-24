import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http:HttpClient
  ) { }
  /* For Adding Products */
  getStore():Observable<any>{
    let StoreURL = "http://localhost:3000/store/"
    return this._http.get<any>(StoreURL)
  }
  getBrand():Observable<any>{
    let BrandURL = "http://localhost:3000/brand/"
    return this._http.get<any>(BrandURL)
  }
  getCategory():Observable<any>{
    let CategoryURL = "http://localhost:3000/category/"
    return this._http.get<any>(CategoryURL)
  }

  getAttributes():Observable<any>{
    let AttributeURL = 'http://localhost:3000/attributes'
    return this._http.get<any>(AttributeURL)
  }

  getProducts():Observable<any>{
    let getURL  = "http://localhost:3000/product";
    return this._http.get<any>(getURL);
  }

  insertProduct(body):Observable<any>{
    let insertURL  = "http://localhost:3000/product/insert"
    return this._http.post<any>(insertURL,body);
  }
  insertAttributes(id,body):Observable<any>{
    let insertURL  = "http://localhost:3000/product/insert/"+id;
    return this._http.post<any>(insertURL,body);
  }


}
