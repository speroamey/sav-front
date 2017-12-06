import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../../shared/model/request-util';
// import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class equipementModalService {
  public token: string;
  private equipementUrl = HOST+'/equipement';

   constructor( private router: Router,private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
   }

   load(){
     const options: BaseRequestOptions = new BaseRequestOptions();
     options.headers.append('Content-Type','application/json')

     return this.http
       .get(this.equipementUrl, options)
         .map((res) => {
           return res;
         })
     }

  add(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.equipementUrl, data, options)
        .map((res) => {
          return res.json();
        })
    }

    update(id,data){
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')
        // return this.http.put(`${this.equipementUrl}/${id}`, options);
      return this.http
        .put(`${this.equipementUrl}/${id}`, data, options)
          .map((res) => {
            return res.json();
          })
      }

    remove(id){
      console.log(id);
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')

      return this.http.delete(`${this.equipementUrl}/${id}`, options);
      }
}
