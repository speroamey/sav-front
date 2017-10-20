import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './AuthServices';
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): boolean {
    console.log(this.authService.isLoggedIn())
    return this.authService.isLoggedIn();
  }
}
