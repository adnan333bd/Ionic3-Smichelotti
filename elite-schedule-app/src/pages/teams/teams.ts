import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let seletedTournament = this.navParams.data;
    let loader = this.loadingController.create({
      content: "Getting teams of " + seletedTournament.name,
      spinner: "dots"
    });
    loader.present()
      .then(() => {
        this.eliteApi.getTournamentData(seletedTournament.id)
          .subscribe(data => {
            this.teams = data.teams;
            loader.dismiss();
          });
      });
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
