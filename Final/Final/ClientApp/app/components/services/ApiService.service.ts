
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Todo } from "../todo/todo.interface";
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class ApiService {


    constructor(private http: Http, private router: Router) { }

    public getTodos() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get("/api/todo", options).map(response => response.json());    
    }

    public getTodo(id: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get("/api/todo/" + id, options).map(response => response.json());
    }

    public deleteTodo(id: number) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });
        return this.http.delete("/api/todo/" + id, options).subscribe((res) => {
            if (res.status == 201) {
                console.log(res);

            }
        });
    }

    public addTodo(todoInfo: any) {
        console.log(todoInfo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${authToken }`);
        let options = new RequestOptions({ headers: headers });
        return this.http.post("/api/todo/", JSON.stringify(todoInfo), options).subscribe((res) => {
            if (res.status == 200) {
                this.router.navigate(['./home']);
            }});
    }

    public updateTodo(todoInfo: any) {
        console.log(todoInfo);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', `Bearer ${authToken }`);
        let options = new RequestOptions({ headers: headers });
        return this.http.put("/api/todo/" + todoInfo.id, todoInfo, options).subscribe((res) => {
            if (res.status == 201) {
                this.router.navigate(['./fake']);
            }
        });
    }
};