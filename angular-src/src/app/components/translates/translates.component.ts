import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-translates',
  templateUrl: './translates.component.html',
  styleUrls: ['./translates.component.scss']
})
export class TranslatesComponent implements OnInit {
  public translates;
  public parsedTranslatesByUser = {};
  public userTranslates;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.getTranslates();
  }

  getTranslates() {
    this.activityService.getTranslates().subscribe((translates) => {
      this.translates = translates;
      this.parseTranslates();
    });
  }

  parseTranslates() {
    for(let i = 0; i < this.translates.length; i++) {
      let user = this.translates[i].username;
      if(!this.parsedTranslatesByUser[user]) {
        this.parsedTranslatesByUser[user] = [];
      }
      this.parsedTranslatesByUser[user].push(this.translates[i]);
    }
  }
}
