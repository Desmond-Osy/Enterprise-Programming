
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Todo } from "../todo/todo.interface";
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class ApiService {


    hostName: string = 'http://localhost:5000/api/todo';
    //hostName: string = 'http://project4osinakadesmond.azurewebsites.net/api/todo';


    constructor(private http: Http, private router: Router) { }

    public getTodos() {
        return this.http.get(this.hostName).map(response => response.json());    
    }

    public getTodo(id: any) {
        return this.http.get(this.hostName + "/" + id).map(response => response.json());
    }

    public deleteTodo(id: number) {
        return this.http.delete(this.hostName + "/" + id).subscribe((res) => {
            console.log(res);
            if (res.status == 201) {
                console.log(res);

            }
        });
    }

    public addTodo(todoInfo: any) {
        console.log(todoInfo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.hostName, JSON.stringify(todoInfo), options).subscribe((res) => {
            console.log(res);
            if (res.status == 200) {
                this.router.navigate(['./home']);
            }});
    }

    public updateTodo(todoInfo: any) {
        console.log(todoInfo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.hostName + '/' + todoInfo.id, todoInfo, options).subscribe((res) => {
            console.log(res);
            if (res.status == 201) {
                this.router.navigate(['./fake']);
            }
        });
    }
};