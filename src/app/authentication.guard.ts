import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{
  constructor(
    private _userService:UserService,
    private _route: Router
  ){}

  canActivate():boolean{
    if(this._userService.loggedIn()){
      return true
    }else{
      this._route.navigate(['/login'])
      return false
    }
  }


}
