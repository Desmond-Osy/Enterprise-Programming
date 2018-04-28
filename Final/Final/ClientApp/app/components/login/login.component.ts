
import { Component, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { Login } from '../login/login.interface';
import 'rxjs/Rx';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    password: string = "";
    email: string = "";
    successfulSave: boolean = false;
    errors: string[] = [];

    reg: Login = {
        email: "",
        password: ""
    };

    

    constructor(private router: Router, private apiService: ApiService, private location: Location, private http: Http) {
    }

    ngOnInit(): void {


    }


    

    login() {
        this.errors = [];
        this.reg.password = this.password;
        this.reg.email = this.email;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var registerJson = JSON.stringify(this.reg);
        console.log(registerJson);
        this.http.post('/api/user', registerJson, options).map(result => result.json()).subscribe(
            (data) => {
                this.successfulSave = true;
                console.log(data);
               // this.authApi.isLog = true;
                localStorage.setItem('token', data);
                this.router.navigate(['/home']);
            },
            (err) => {
                this.successfulSave = false;
                if (err.status === 400) {
                    //handle validation error
                    console.log(err.text());
                    let validationErrorDictionary = JSON.parse(err.text());
                    for (let fieldName in validationErrorDictionary) {
                        console.log(fieldName);
                        if (validationErrorDictionary.hasOwnProperty(fieldName)) {
                            this.errors.push(validationErrorDictionary[fieldName]);
                        }
                    }
                } else {
                    this.errors.push("Did you sign up yet?");
                }
            }
        );
    }
}