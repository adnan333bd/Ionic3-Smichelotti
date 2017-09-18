import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments: any;
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');

    let loader = this.loadingController.create({
      content: "Getting tournaments",
      spinner: "dots"
    });

    loader.present()
      .then(() => {
        return this.eliteApi.getTournaments();
      })
      .then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

}
