import { Injectable } from '@angular/core';
import { Store } from '../interface/store';
import { HttpClient } from '@angular/common/http' 
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  store:Store[] = [
    { _id: "01", store: "Nike", status: "active" },
    { _id: "01", store: "Adiddas", status: "not-active" },
    { _id: "01", store: "Converse", status: "active" },
    { _id: "01", store: "Peak", status: "not-active" },
    { _id: "01", store: "Vans", status: "active" },
    { _id: "01", store: "World Balance", status: "not-active" },
    { _id: "01", store: "Fila", status: "not-active" },
    { _id: "01", store: "Puma", status: "active" },
    { _id: "01", store: "Skechers", status: "not-active" },
    { _id: "01", store: "Reebok", status: "active" },

    
  ]
   
  _getURL:string = "http://localhost:3000/store/"
  _addURL:string = "http://localhost:3000/store/add"
  
  
  constructor(private _http: HttpClient) { }

  getStore(){
    return this._http.get<any>(this._getURL)
  }
  addStore(store){
    return this._http.post<any>(this._addURL, store)
  }
  deleteStore(id){
    let _deleteURL = "http://localhost:3000/store/delete/"+id
    return this._http.delete<any>(_deleteURL)
  }
  updateStore(id,store,status){
    let Store = {
      "store": store,
      "status": status
    }
    let _updateURL = "http://localhost:3000/store/update/"+id
    return this._http.patch<any>(_updateURL, Store)
  }
}
