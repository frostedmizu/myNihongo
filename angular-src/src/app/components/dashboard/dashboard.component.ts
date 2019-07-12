import { Component, OnInit} from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public questions;
  bsModalRef: BsModalRef;

  constructor(
    private activityService: ActivityService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    //Bring in questions
    this.activityService.getQuestions().subscribe(questions => {
        this.questions = questions;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(AddQuestionModalComponent);
  }

}
