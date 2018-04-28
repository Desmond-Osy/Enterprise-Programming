
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subject } from "rxjs/Rx"
import { Todo } from "../todo/todo.interface";
import 'rxjs/add/operator/map';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';



@Injectable()
export class AuthRouteService {

    public redirectUrl: string;

    constructor(private http: Http) {
        //send an API call to the backend 
    }


    public isLoggedIn(): Observable<boolean>{
        return this.http.get('/api/todo')
            .map((result: Response) => result)
            .catch((error: any) => Observable.throw(error || 'Server Error'));
        
    }
};
