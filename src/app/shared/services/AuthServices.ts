import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../model/request-util';
import { ResponseWrapper } from '../model/response-wrapper.model';

import { Jsonp, Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  private registerUrl = HOST + '/login';

   constructor(private jsonp: Jsonp, private router: Router,private http: Http) { }

  register(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.registerUrl, data, options)
      .map((res: Response) => {
        // let user = res.json();
        console.log("là xa va", res)
                // if (user && user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('currentUser', JSON.stringify(user));
                // }

                // return user;
      })
  }

  login(user: string, password: string): boolean {



    if (user === 'user' && password === 'password') {
      localStorage.setItem('username', user);
      this.router.navigate(['/dashboard']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  private convertResponse(res: Response): ResponseWrapper {
    const jsonResponse = res.json();
    return new ResponseWrapper(res.headers, jsonResponse, res.status);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
 {provide: AuthService, useClass: AuthService},
];
