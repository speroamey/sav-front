import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../../shared/model/request-util';
// import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class prestationModalService {
  public token: string;
  private prestationUrl = HOST + '/prestation';
  private detailsUrl = HOST + '/prestationdetail'
   constructor( private router: Router,private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
   }

   load(){
     const options: BaseRequestOptions = new BaseRequestOptions();
     options.headers.append('Content-Type','application/json')

     return this.http
       .get(this.prestationUrl, options)
         .map((res) => {
           return res;
         })
     }

  add(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.prestationUrl, data, options)
        .map((res) => {
          return res.json();
        })
    }

    findDetails(id){
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')

      return this.http
        .get(`${this.detailsUrl}/${id}`, options)
          .map((res) => {
            return res;
          })
      }


    update(id,data){
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')
        // return this.http.put(`${this.prestationUrl}/${id}`, options);
      return this.http
        .put(`${this.prestationUrl}/${id}`, data, options)
          .map((res) => {
            return res;
          })
      }

    remove(id){
      console.log(id);
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')

      return this.http.delete(`${this.prestationUrl}/${id}`, options);
      }
}
