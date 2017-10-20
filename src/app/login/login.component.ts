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
    constructor(public router: Router, private authService: AuthService) {
        this.credentials = {};
    }

    ngOnInit() {
    }

    onLoggedin() {
      this.message = '';
      console.log(this.password);
      if (!this.authService.login(this.username, this.password)) {
        this.message = 'Incorrect credentials.';
        console.log(this.message);
        setTimeout(function() {
          this.message = '';
        }.bind(this), 2500);
      }
      return false;
        // localStorage.setItem('isLoggedin', 'true');
    }

    onSignUp() {
      this.message = '';
      console.log(this.password);
      this.credentials.username=this.username;
      this.credentials.password=this.password;

      if (this.credentials) {
        this.authService.register(this.credentials)
        .subscribe(
            ((fiche: any) => {
                this.data = fiche;
                console.log(this.data);
            })
        );

        this.message = 'Incorrect credentials.';
        console.log(this.message);
        // setTimeout(function() {
        //   this.message = '';
        // }.bind(this), 2500);
      }
    //   return false;
        // localStorage.setItem('isLoggedin', 'true');
    }

}
