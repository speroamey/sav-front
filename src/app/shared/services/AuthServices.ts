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
  private registerUrl = HOST +'/register'

   constructor( private router: Router,private http: Http) {}

  register(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.registerUrl, data, options)
        .map((res) => {
          console.log(res.json());
          return res.json();

          // if(data){
          //   localStorage.setItem('currentUser', JSON.stringify({ username: data.username, token: data.password }));
          //   return true;
          // }else{
          //   return false;
          // }

        })
    }

    login(data){
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


}

export const AUTH_PROVIDERS: Array<any> = [
 {provide: AuthService, useClass: AuthService},
];
