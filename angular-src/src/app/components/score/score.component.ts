import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  public scores: any;
  public parsedScoresByLevel = {};
  public parsedScores = {};

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.getScores();
  }

  getScores() {
    this.activityService.getScores().subscribe(scores => {
        this.scores = scores;
        this.parseScores();

      },
      err => {
        console.log(err);
        return false;
      });
  }

  parseScores() {
    for(let i = 0; i < this.scores.length; i++) {
      if(!this.parsedScoresByLevel['level' + this.scores[i].level]) {
        this.parsedScoresByLevel['level' + this.scores[i].level] = [];
        this.parsedScoresByLevel['level' + this.scores[i].level].push(this.scores[i]);
      } else {
        this.parsedScoresByLevel['level' + this.scores[i].level].push(this.scores[i]);
      }
    }

    for (let level in this.parsedScoresByLevel) {
      if (this.parsedScoresByLevel.hasOwnProperty(level)) {
        this.parsedScores[level] = {};
        let levelScores = this.parsedScoresByLevel[level];
        for(let j = 0; j < levelScores.length; j++) {
          let username = levelScores[j].username;
          if(!this.parsedScores[level][username] ) {
            //if username is new, initialize counts to 0
            this.parsedScores[level][username] = {};
            this.parsedScores[level][username]['correct'] = 0;
            this.parsedScores[level][username]['total'] = 0;
          }
          if(levelScores[j].correct) {
            this.parsedScores[level][username]['correct'] += 1;
          }
          this.parsedScores[level][username]['total'] += 1;
        }
      }
    }
  }

}
