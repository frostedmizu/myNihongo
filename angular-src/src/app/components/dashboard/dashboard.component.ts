import {Component, OnInit} from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";
import { Subscription } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private activityService: ActivityService,
    private modalService: BsModalService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {}
}
