import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthService} from '../shared/services/AuthServices';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  username: string;
  password: string;
  private credentials:{username?:string,email?:string,password?:string,repeatpassword?:string};
  message: string;
  private data:any;
  private loading = false;
    constructor(public router: Router, private authService: AuthService) {
      this.credentials={};
     }

    ngOnInit() { }


    onSignUp() {
      this.message = '';
      // this.credentials.username=this.username;
      // this.credentials.password=this.password;
      if (this.credentials) {
        // console.log(this.credentials)
        this.authService.register(this.credentials)
        .subscribe((result) => {
            console.log(result);
            this.data=result;
            console.log(this.data.status)
            if(this.data.status=="success"){
              this.router.navigate(['/login']);
            }
        });
      }
    }
}
