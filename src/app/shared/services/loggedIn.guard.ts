import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './AuthServices';
import {Router} from '@angular/router';
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router : Router) {}
  canActivate(){
    // console.log(this.authService.isLoggedIn())
    // return this.authService.isLoggedIn();
    if (localStorage.getItem('currentUser')) {
              // logged in so return true
              return true;
          }

          // not logged in so redirect to login page
          this.router.navigate(['/login']);
          return false;
  }



}
