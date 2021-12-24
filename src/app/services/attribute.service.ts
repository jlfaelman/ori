import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(
    private _http:HttpClient
  ) { }

  getAttributes():Observable<any>{
   let getURL = "http://localhost:3000/attributes" 
    return this._http.get<any>(getURL)
  }
  getArray(attribute,id):Observable<any>{
    let getURL = "http://localhost:3000/attributes/view/"+attribute+"/"+id
    return this._http.get<any>(getURL)
  }

  addAttribute(attribute):Observable<any>{
    let addURL = "http://localhost:3000/attributes/insert"
    let attributeBody = {
      attribute:attribute
    }
    return this._http.post<any>(addURL, attributeBody)
  }

  addOption(id,attribute,option):Observable<any>{
    let addURL = "http://localhost:3000/attributes/add/"+attribute+"/"+id
    let attributeBody = {
      option:option
    }
    return this._http.patch<any>(addURL,attributeBody)
  }

  deleteAttribute(id){
    let deleteURL = "http://localhost:3000/attributes/drop/"+id
    return this._http.delete<any>(deleteURL)
  }

  deleteOption(attribute,attrid,id,option): Observable<any>{
    let deleteURL = "http://localhost:3000/attributes/delete/"+attribute+"/"+attrid
    let attributeBody = {
      id:id,
      option:option
    }
    return this._http.patch<any>(deleteURL, attributeBody)
  }

}
