import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../model/request-util';
import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  public token: string;
  private loginUrl = HOST + '/login';

   constructor( private router: Router,private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
   }

  register(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.loginUrl, data, options)
        .map((res) => {
          console.log('auth service',res)
          let data=res.json();
          if(data){
            localStorage.setItem('currentUser', JSON.stringify({ username: data.username, token: data.password }));
            return true;
          }else{
            return false;
          }

        })
    }

  // login(user: string, password: string): boolean {
  //
  //
  //
  //   if (user === 'user' && password === 'password') {
  //     localStorage.setItem('username', user);
  //     this.router.navigate(['/dashboard']);
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  logout(): any {
    localStorage.removeItem('currentUser');
  }

  // getUser(): any {
  //   return localStorage.getItem('currentUser');
  // }
  // isLoggedIn(): boolean {
  //   return this.getUser() !== null;
  // }

  private convertResponse(res: Response): ResponseWrapper {
    const jsonResponse = res.json();
    return new ResponseWrapper(res.headers, jsonResponse, res.status);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
 {provide: AuthService, useClass: AuthService},
];
