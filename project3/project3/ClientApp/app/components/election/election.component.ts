import { Component, Inject, Input, OnInit } from '@angular/core';
import { Election } from '../election/election.interface';
import { ElectionService } from './election.service';

@Component({
    selector: 'election',
    templateUrl: './election.component.html'
})
export class ElectionComponent implements OnInit {
    
    public electionId: any;
    public elections: Election[] = [];

    constructor( private electionService: ElectionService) {
    }

    ngOnInit(): void {
        this.fetchElections();

    }

    fetchElections(): void {
        
        this.electionService.getElections().subscribe(election => {
            this.elections = election.elections;
            this.elections = this.elections.filter(e => e.id != 2000);
        })
    }
}


