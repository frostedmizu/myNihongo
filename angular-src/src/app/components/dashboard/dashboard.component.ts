import {Component, OnInit} from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";
import { Subscription } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public questions;
  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];

  constructor(
    private activityService: ActivityService,
    private modalService: BsModalService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    //Bring in questions
    this.getQuestions();

    this.subscriptions.push(this.modalService.onHide.subscribe((reason: string) => {
      this.getQuestions();
    }));
  }

  openModal() {
    this.bsModalRef = this.modalService.show(AddQuestionModalComponent);
  }

  getQuestions() {
    this.activityService.getQuestions().subscribe(questions => {
        this.questions = questions;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  deleteQuestion(index) {
    console.log(this.questions[index]._id);
    let id = this.questions[index]._id;
    this.activityService.deleteQuestion(id).subscribe(questions => {
        this.questions = questions;
        this.flashMessagesService.show('Question removed',
          {cssClass: 'alert-success', timeout: 3000});
      },
      err => {
        console.log(err);
        return false;
      });
  }

  hasQuestions() {
    if(!this.questions) {
      return false;
    } else if(!this.questions.length) {
      return false;
    } else {
      return true;
    }
  }
}
