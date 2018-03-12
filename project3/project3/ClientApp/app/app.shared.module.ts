import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ElectionService } from './components/election/election.service';
import { ElectionComponent } from './components/election/election.component';
import { AuthService } from './components/app/auth-service.provider';
import { PokemonAudit } from './components/pokAudit/pokAudit-directive';
import { UpcomingElection } from './components/upcomingElection/upcomingElection.component';
import { RepresentativeComponent } from './components/representative/representative.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ElectionComponent,
        RepresentativeComponent,
        UpcomingElection,
        PokemonAudit
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'election', component: ElectionComponent },
            { path: 'representative', component: RepresentativeComponent },
            { path: 'upcomingElection', component: UpcomingElection },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        ElectionService,
        AuthService
    ]
})
export class AppModuleShared {
}
