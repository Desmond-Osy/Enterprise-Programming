import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Election } from "./election.interface";
import 'rxjs/add/operator/map';

@Injectable()
export class ElectionService {

    constructor(private http: Http) { }

    getElections(){
        return this.http.get('https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyDBp_8T-a-FIjWaB--pi9hGnTmftE-_d1k')
            .map(result => result.json());         
    }

    getReps(address: string) {
        address = encodeURI(address);
        return this.http.get('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDBp_8T-a-FIjWaB--pi9hGnTmftE-_d1k' + '&address=' + address)
            .map(result => result.json());
    }

    getUpcomingElection(address: string, id: string) {
        address = encodeURI(address);
        return this.http.get('https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDBp_8T-a-FIjWaB--pi9hGnTmftE-_d1k' + '&address=' + address + '&electionId=' + id)
            .map(result => result.json());
    }


    
}