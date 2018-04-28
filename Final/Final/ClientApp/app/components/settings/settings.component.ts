
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    Todos: Todo[] = [];
    TodosBackup: Todo[] = [];
    days: number;
    hours: number;

    constructor(private router: Router, private apiService: ApiService, private location: Location) {
    }

    ngOnInit(): void {
        this.fetchTodos();
    }



    fetchTodos(): void {
        this.apiService.getTodos().subscribe(Todos => {
            this.TodosBackup = Todos;
            for (let todo of this.TodosBackup) {
                if (todo.state != "completed") {
                    this.Todos.push(todo);
                }
            }

        })
    }


    updateSettings() {
        for (let todo of this.Todos) {
            todo.warnDay = this.days;
            todo.warnHour = this.hours;
            this.apiService.updateTodo(todo);
        }
    }

}
