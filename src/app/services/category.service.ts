import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: HttpClient
  ) { }

  getCategory():Observable<any>{
    let getURL = "http://localhost:3000/category"
    return this._http.get<any>(getURL)
  }
  deleteCategory(id):Observable<any>{
    let addURL ="http://localhost:3000/category/delete/"+id  
    return this._http.delete<any>(addURL)
  }
  
  editCategory(category,status,id):Observable<any>{
    let addURL ="http://localhost:3000/category/update/"+id  
    let categoryBody = {
      category:category,
      status:status
    }
    return this._http.patch<any>(addURL,categoryBody)
  }
  addCategory(category,status):Observable<any>{
    let addURL ="http://localhost:3000/category/insert/"  
    let categoryBody = {
      category:category,
      status:status
    }
    return this._http.post<any>(addURL,categoryBody)
  }

}
