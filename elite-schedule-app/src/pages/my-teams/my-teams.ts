import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TournamentsPage } from '../tournaments/tournaments';

@Component({
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  constructor(private navCtrl: NavController, private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

}
