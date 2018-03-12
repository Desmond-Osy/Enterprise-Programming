import { Component, Inject, Input, OnInit } from '@angular/core';
import { UpcomingElec } from './upcomingElection.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ElectionService } from './../election/election.service';


@Component({
    selector: 'upcomingElection',
    templateUrl: './upcomingElection.component.html',
    styleUrls: ['./upcomingElection.component.css']
})
export class UpcomingElection implements OnInit {

    public upcomingElection: UpcomingElec;
    public displayAddress: string = '';
    public displayId: string = '';

    constructor(private route: ActivatedRoute, private electionService: ElectionService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.displayAddress = params['address'];
            this.displayId = params['id'];
        });
        this.fetchUpcomingElections(this.displayAddress, this.displayId);

    }

    fetchUpcomingElections(address: string, id: string): void {

        this.electionService.getUpcomingElection(address, id).subscribe(result => {
            this.upcomingElection = result;
            console.log(this.upcomingElection);
        })
    }

    googleMap(location: any) {
        return encodeURI(
            location.address.city + ' ' +
            location.address.line1 + ' ' +
            location.address.locationName + ' ' +
            location.address.state + ' ' +
            location.address.zip 
            )
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


