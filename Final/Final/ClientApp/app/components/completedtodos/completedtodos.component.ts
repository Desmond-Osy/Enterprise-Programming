
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'completedtodos',
    templateUrl: './completedtodos.component.html'
})

export class CompletedTodos {
    Todos: Todo[] = [];
    TodosBackup: Todo[] = [];
    displayCompleted: boolean = false;
   
    public sortBy: string = "Date";   //default sort by date

    constructor(private router: Router, private apiService: ApiService, private location: Location) {
    }

    ngOnInit(): void {
        this.fetchTodos();
        this.sortTodos();

    }



    fetchTodos(): void {
        this.apiService.getTodos().subscribe(Todos => {
            this.TodosBackup = Todos;
            for (let todo of this.TodosBackup) {
                if (todo.state == "completed") {
                    this.Todos.push(todo);
                }
            }

        })

        //convert the dates to local using moment
        this.Todos.forEach(function (value) {
            value.date = moment.utc(value.date).local().format();
        });
    }
    public addTodo() {
        
        this.router.navigate(['/todo']);
        this.sortTodos();
    }

    sortTodos() {
        if (this.sortBy == "Description_Asc") {
            this.Todos.sort((t1, t2): number => {
                if (t1.desc > t2.desc) return 1;
                if (t1.desc < t2.desc) return -1;
                return 0;
            });
        }
        else if (this.sortBy == "Description_Desc") {
            this.Todos.sort((t1, t2): number => {
                if (t1.desc > t2.desc) return -1;
                if (t1.desc < t2.desc) return 1;
                return 0;
            });
        }
        else if (this.sortBy == "Date") {
            this.Todos.sort((a, b): number => {
                let dateA = new Date(a.date).getTime();
                let dateB = new Date(b.date).getTime();
                return dateA - dateB;
            });
        }
    }

     isTodosEmpty(): boolean {
        if (this.Todos.length == 0) {
            return true;
        } else {
            return false;
        }
     }


     deleteTodo(id: number) {
         this.apiService.deleteTodo(id);
         this.fetchTodos();
         this.router.navigate(['/fake']);
     }
    
     editTodo(id: number) {

         this.router.navigate(['/todoupdate', id]);
         this.sortTodos();
     }

     checkTodoState(input: any): string {
             var currentTime = moment().utc().format();
             var dueTime = moment(input.date).utc().format();
             var warnTime = moment(input.date).utc().subtract( 2, 'days').format();

             if (moment(currentTime).isAfter(dueTime)) {
                 return 'danger';
             } else if (moment(currentTime).isAfter(warnTime)) {
                 return 'warning';
             } else {
                 return 'active';
             }
         
     }

}