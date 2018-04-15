
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import * as moment from 'moment';

@Component({
    selector: 'todo',
    templateUrl: './todoupdate.component.html',
})
 
export class TodoUpdateComponent{
    //id: number = 1;
   // desc: string = "";
    //date: string = "";
   // tagString: string = "";
    //warnHour: number = 0;
    //warnDay: number = 2;

    arrayTag: string[] = [];
    arrayString: string = "";

    todo: any = {
        desc:  "",
        date:  "",
        tagString:  "",
        warnHour:  0,
        warnDay:  2
    };

    constructor(private route: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.getTodo(id);
    }

    updateTodo() {

        //let tagArray = this.tagString.split(', ');
        //var model = {
        //    desc: this.desc,
        //    date: moment(this.date).utc().format(),
        //    warnHours: this.warnHour,
        //    warnDays: this.warnDay,
        //    tags: tagArray
        //
     }
       // this.apiService.updateTodo(model);

        //this.router.navigate(['/home']);

    getTodo(id: any) {
        this.apiService.getTodo(id).subscribe(todo => {
            this.todo = todo;
            this.todo.date = moment.utc(this.todo.date)
                .local()
                .format('YYYY-MM-DDTkk:mm:ss');

            console.log(todo);

            for (let tag of todo.tags) {
                this.arrayTag.push(tag.name);
            }
            this.arrayString = this.arrayTag.join(', ');
            
        });
    }
}
