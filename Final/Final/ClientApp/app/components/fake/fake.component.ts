
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/ApiService.service';
import { Todo } from '../todo/todo.interface';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'fake',
    templateUrl: './fake.component.html'
})

export class FakeComponent {

    constructor(private router: Router, private apiService: ApiService, private location: Location) {
    }

    ngOnInit(): void {
        this.router.navigate(['./home']);

    }
}