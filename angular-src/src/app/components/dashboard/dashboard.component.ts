import {Component, OnInit} from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private activityService: ActivityService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {}

  deleteScores() {
    this.activityService.deleteScores().subscribe((response) => {
      this.flashMessagesService.show('Vocab scores have been reset',
        {cssClass: 'alert-success', timeout: 3000});
    });
  }
}


