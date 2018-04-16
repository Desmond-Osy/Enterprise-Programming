import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './components/app/auth-service.provider';
import { ApiService } from './components/services/ApiService.service';

import { TodoComponent } from './components/todo/todo.component';
import { SettingsComponent } from './components/settings/settings.component';

import { TodoUpdateComponent } from './components/todoupdate/todoupdate.component';

import { CompletedTodos } from './components/completedtodos/completedtodos.component';
import { FakeComponent } from './components/fake/fake.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        TodoComponent,
        TodoUpdateComponent,
        CompletedTodos,
        FakeComponent,
        SettingsComponent
    ],
    imports: [ 
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'todo', component: TodoComponent },
            { path: 'completedtodos', component: CompletedTodos },
            { path: 'fake', component: FakeComponent },
            { path: 'todoupdate/:id', component: TodoUpdateComponent },
            { path: '**', redirectTo: 'home' }
   
        ])
    ],
    providers: [
        AuthService,
        ApiService
    ]
})
export class AppModuleShared {
}
