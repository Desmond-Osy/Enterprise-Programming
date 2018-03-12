import { Component, Inject, Input, OnInit } from '@angular/core';
import { Official } from './official.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ElectionService } from './../election/election.service';
import { Office } from './office.interface';

@Component({
    selector: 'representative',
    templateUrl: './representative.component.html',
    styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent implements OnInit {
    
    public officials: Official[] = [];
    public offices: Office[] = [];

    public displayAddress: string = '';

    constructor(private route: ActivatedRoute, private electionService: ElectionService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.displayAddress = params['address'];
        });
        this.fetchRepresentatives(this.displayAddress);

    }

    fetchRepresentatives(address: string): void {

        this.electionService.getReps(address).subscribe(result => {
            this.officials = result.officials;
            this.offices = result.offices;
            console.log(this.officials);
            console.log(this.offices);

            for (let office of this.offices) {
                for (let index of office.officialIndices) {
                    this.officials[index].office = office.name;
                }
            }

        })
    }

    youtube(type: string) {
        if (type == 'YouTube') {
            return true;
        }
        return false;
    }

    twitter(type: string) {
        if (type == 'Twitter') {
            return true;
        }
        return false;
    }

    facebook(type: string) {
        if (type == 'Facebook') {
            return true;
        }
        return false;
    }

    google(type: string) {
        if (type == 'GooglePlus') {
            return true;
        }
        return false;
    }


}


