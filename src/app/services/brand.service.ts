import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private _http: HttpClient
  ) { }

  getBrand():Observable<any>{
    let getURL = "http://localhost:3000/brand"
    return this._http.get<any>(getURL)
  }
  deleteBrand(id):Observable<any>{
    let addURL ="http://localhost:3000/brand/delete/"+id  
    return this._http.delete<any>(addURL)
  }
  
  editBrand(brand,status,id):Observable<any>{
    let addURL ="http://localhost:3000/brand/update/"+id  
    let brandBody = {
      brand:brand,
      status:status
    }
    return this._http.patch<any>(addURL,brandBody)
  }
  addBrand(brand,status):Observable<any>{
    let addURL ="http://localhost:3000/brand/insert/"  
    let brandBody = {
      brand:brand,
      status:status
    }
    return this._http.post<any>(addURL,brandBody)
  }
}
