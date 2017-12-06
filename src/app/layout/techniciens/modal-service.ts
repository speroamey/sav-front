import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../../shared/model/request-util';
// import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class technicienModalService {
  public token: string;
  private technicienUrl = HOST + '/technicien';

   constructor( private router: Router,private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
   }

   load(){
     const options: BaseRequestOptions = new BaseRequestOptions();
     options.headers.append('Content-Type','application/json')

     return this.http
       .get(this.technicienUrl, options)
         .map((res) => {
           return res;
         })
     }

  add(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.technicienUrl, data, options)
        .map((res) => {
          return res.json();
        })
    }

    update(id,data){
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')
        // return this.http.put(`${this.technicienUrl}/${id}`, options);
        return this.http
          .put(`${this.technicienUrl}/${id}`,data, options)
            .map((res) => {
              return res;
            })

      }

    remove(id){
      console.log(id);
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')

      return this.http.delete(`${this.technicienUrl}/${id}`, options);
      }
}
