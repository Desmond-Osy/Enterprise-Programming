
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    Todos: Todo[] = [];
    TodosBackup: Todo[] = [];
    displayCompleted: boolean = false;
    tagString: string = "";
    todo: Todo;
   
    public sortBy: string = "Date";   //default sort by date

    constructor(private router: Router, private apiService: ApiService, private location: Location) {
    }

    ngOnInit(): void {
        this.fetchTodos();
        this.sortTodos();

        for (var i = 0; i < this.Todos.length; i++) {
            this.Todos[i].date = moment.utc(this.TodosBackup[i].date, 'YYYY-MM-DDTkk:mm:ssTZD').local().format('LL');
            
        }

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

     completeTodo(id: number) {
         for (let todo of this.Todos) {
             if (todo.id == id) {
                 todo.state = "completed";
                 this.apiService.updateTodo(todo);
             }
         }
         
     }
    
     editTodo(id: number) {

         this.router.navigate(['/todoupdate', id]);
         this.sortTodos();
     }

     checkTodoState(input: any): string {
             var currentTime = moment().utc().format();
             var dueTime = moment(input.date).utc().format();
             var warnTime = moment(input.date).utc().subtract(this.Todos[0].warnDay, 'days').format();

             if (moment(currentTime).isAfter(dueTime)) {
                 return 'danger';
             } else if (moment(currentTime).isAfter(warnTime)) {
                 return 'warning';
             } else {
                 return 'active';
             }
         
     }

     displayCompletedTodos() {
         let objCopy = JSON.parse(JSON.stringify(this.Todos));
         this.Todos = [];
     }

     filterTodo() {
         this.Todos = [];
         console.log(this.TodosBackup[0]);
         if (this.tagString == "") { this.Todos = this.TodosBackup; }
         else {
         let tagArray = this.tagString.split(', ');

             for (let todo of this.TodosBackup) {
                 this.apiService.getTodo(todo.id).subscribe(todo => {
                     this.todo = todo;

                     for (let tag of todo.tags) {
                         if (tagArray.indexOf(tag.name) > -1) {
                             this.Todos.push(todo);
                         }
                     }
                 });
             }
         }
     }

}