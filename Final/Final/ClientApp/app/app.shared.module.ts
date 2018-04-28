import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        TodoComponent,
        TodoUpdateComponent,
        CompletedTodos,
        FakeComponent,
        RegisterComponent,
        LoginComponent,
        SettingsComponent
    ],
    imports: [ 
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'todo', component: TodoComponent },
            { path: 'completedtodos', component: CompletedTodos },
            { path: 'register', component: RegisterComponent},
            { path: 'login', component: LoginComponent },
            { path: 'fake', component: FakeComponent },
            { path: 'todoupdate/:id', component: TodoUpdateComponent },
            { path: '**', redirectTo: 'register' }
            
   
        ])
    ],
    providers: [
        AuthService,
        ApiService
    ]
})
export class AppModuleShared {
}
