
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subject } from "rxjs/Rx"
import { Todo } from "../todo/todo.interface";
import 'rxjs/add/operator/map';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthRouteService } from './Auth.service';


@Injectable()
export class LoggedInAuthGuard implements CanActivate {
    

    public isLoggedIn: boolean = false;


    public redirectUrl: string;

    constructor(private router: Router, private authService: AuthRouteService) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.redirectUrl = state.url;
        return this.checkLogin(this.redirectUrl);
    }


    checkLogin(url: string): boolean {
        if (this.isLoggedIn) {
            return true;
        } else {
            this.authService.isLoggedIn().subscribe(
                res => {
                    this.isLoggedIn = true;
                    this.router.navigateByUrl(url);
                    
                },
                err => {
                    this.isLoggedIn = false;
                    this.authService.redirectUrl = url;
                    this.router.navigateByUrl('/login');
                    
                }
            )

            return this.isLoggedIn;
       } 

    }
    

};