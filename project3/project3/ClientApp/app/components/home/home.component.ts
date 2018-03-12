
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {

    address: string = '';
    electionId: string = '';
    devices = 'Representatives Upcoming_Elections'.split(' ');
    selectedDevice = 'Representative';

    constructor(private router: Router) { }

    public searchAddress(address: string) {
        if (this.selectedDevice == "Representatives") {
            this.router.navigate(['/representative'],
                { queryParams: { address: address } });
        } else if (this.selectedDevice == "Upcoming_Elections") {
            this.router.navigate(['/upcomingElection'],
                { queryParams: { address: address, id: this.electionId } });
        }
    }


    onChange(newValue: string) {
        console.log(newValue);
        this.selectedDevice = newValue;
        if (newValue == "UpcomingElection") {
            window.location.reload();
            window.location.reload();
        }
    }

    isUpcomingElection() {
        return true;
    }
}