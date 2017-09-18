import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage } from '../my-teams/my-teams';
import { StandingsPage } from '../standings/standings';
import { TeamDetailPage } from '../team-detail/team-detail';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log("nav params: ", this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goToMyTeams() {
    this.navCtrl.popToRoot();
  }

}
