import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AuthService} from '../shared/services/AuthServices';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    private credentials:any;
    message: string;
    private data:any;
    private loading = false;
    constructor(public router: Router, private authService: AuthService) {
        this.credentials = {};
    }

    ngOnInit() {
         this.authService.logout();
    }

    // onLoggedin() {
    //   this.message = '';
    //   console.log(this.password);
    //   if (!this.authService.login(this.username, this.password)) {
    //     this.message = 'Incorrect credentials.';
    //     console.log(this.message);
    //     setTimeout(function() {
    //       this.message = '';
    //     }.bind(this), 2500);
    //   }
    //   return false;
    //     // localStorage.setItem('isLoggedin', 'true');
    // }

    onSignUp() {
      this.message = '';
      this.credentials.username=this.username;
      this.credentials.password=this.password;
      if (this.credentials) {
        this.authService.register(this.credentials)
        .subscribe(result => {
                console.log(result);
                if (result === true) {
                    this.data=result;
                    console.log('jusque là ',this.data);
                    this.router.navigate(['/']);
                } else {

                    this.loading = false;
                }
            // ((fiche: any) => {
            //     this.data = fiche;
            // })
        });

        // this.message = 'Incorrect credentials.';
        // console.log(this.message);
        // setTimeout(function() {
        //   this.message = '';
        // }.bind(this), 2500);
      }
    //   return false;
        // localStorage.setItem('isLoggedin', 'true');
    }

}
