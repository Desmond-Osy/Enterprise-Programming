
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import * as moment from 'moment';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
})
 
export class TodoComponent{
    desc: string = "";
    date: string = "";
    tagString: string = "";
    warnHours: number = 0;
    warnDays: number = 2;
    state: string = "active";

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit(): void {

    }

    addTodo() {

        let tagArray = this.tagString.split(', ');
        var model = {
            desc: this.desc,
            date: moment(this.date).utc().format(),
            warnHours: this.warnHours,
            warnDays: this.warnDays,
            state: this.state,
            tags: tagArray
        }

        this.apiService.addTodo(model);

        //this.router.navigate(['/home']);
    }
}
