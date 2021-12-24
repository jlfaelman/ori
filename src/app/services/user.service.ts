import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
  private _http:HttpClient
  ) { }

  loginUser(userCred):any{
    let loginURL = "http://localhost:3000/user/login"
    return this._http.post<any>(loginURL,userCred);
  }
  getUsers():any{
    let getURL = "http://localhost:3000/user"
    return this._http.get<any>(getURL)
  }
  addUser(userCred):any{
    let registerURL = 'http://localhost:3000/user/register'
    return this._http.post<any>(registerURL, userCred)
  }
  deleteUser(id):any{
    let deleteURL = "http://localhost:3000/user/delete/"+id
    return this._http.delete<any>(deleteURL)
  }
  updateUser(id,email,first,last,pass){
    let updateURL = "http://localhost:3000/user/update/"+id
    let userCred = {
      email:email,
      firstname:first,
      lastname:last,
      password:pass
    }
    return this._http.patch<any>(updateURL,userCred)
  }

  loggedIn(){
    return !!sessionStorage.getItem('token')
  }

}
