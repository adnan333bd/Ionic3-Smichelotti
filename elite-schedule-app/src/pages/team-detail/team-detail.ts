import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
import { EliteApi } from '../../shared/elite-api.service';
import {GamePage } from '../../pages/game/game';

@Component({
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  games: any[];
  team: any;
  private tourneyData: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
  private eliteApi: EliteApi) {  }

  ionViewDidLoad() {    
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                .filter((g: any) => g.team1Id === this.team.id || g.team2Id === this.team.id)
                .map(g => {
                  let isTeam1 = (g.team1Id === this.team.id);
                  let opponentName = isTeam1 ? g.team2 : g.team1;
                  let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                  return {
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                  };
                })
                .value();

  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
        var teamScore = (isTeam1 ? team1Score : team2Score);
        var opponentScore = (isTeam1 ? team2Score : team1Score);
        var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
        return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
        return "";
    }
}

  goToMyTeamsPage() {
    console.log("** parent", this.navCtrl.parent )
    // Tabs > Nav
    this.navCtrl.parent.parent.popToRoot();
  }

  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

}
