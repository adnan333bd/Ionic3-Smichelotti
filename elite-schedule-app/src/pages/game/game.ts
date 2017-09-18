import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import { TeamHomePage } from '../pages';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any={};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
    console.log('ionViewDidLoad GamePage');
    console.log('game in gamepage', this.navParams.data);
  }

  ionViewDidLoad() {


    this.game = this.navParams.data;
  }

  teamTapped(teamId) {
    let tournyData = this.eliteApi.getCurrentTourney();
    let team = tournyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

}
