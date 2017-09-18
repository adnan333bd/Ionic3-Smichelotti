import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class EliteApi {
    private baseUrl = "https://elite-schedule-app-fa349.firebaseio.com/";
    private currentTourney: any;
    constructor(private http: Http) {
    }

    getTournaments() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()), error => reject(error));
        });
    }

    getTournamentData(tournamentId): Observable<any> {
        return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
            .map((response: Response) => {
                this.currentTourney = response.json();
                return this.currentTourney;
            });
    }

    getCurrentTourney() {
        return this.currentTourney;
    }
}