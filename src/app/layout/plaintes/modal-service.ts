import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../../shared/model/request-util';
// import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PlainteModalService {
  public token: string;
  private plainteUrl = HOST + '/plainte';

   constructor( private router: Router,private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
   }

   load(){
     const options: BaseRequestOptions = new BaseRequestOptions();
     options.headers.append('Content-Type','application/json')

     return this.http
       .get(this.plainteUrl, options)
         .map((res) => {
           return res;
         })
     }

  add(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.plainteUrl, data, options)
        .map((res) => {
          return res.json();
        })
    }

    update(id,data){
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')
        // return this.http.put(`${this.plainteUrl}/${id}`,data,options);
      return this.http
        .put(`${this.plainteUrl}/${id}`, data, options)
          .map((res) => {
            return res.json();
          })
      }

    remove(id){
      console.log(id);
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')

      return this.http.delete(`${this.plainteUrl}/${id}`, options);
      }
}
