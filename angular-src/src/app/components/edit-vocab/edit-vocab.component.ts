import {Component, OnInit} from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddQuestionModalComponent} from "../add-question-modal/add-question-modal.component";
import { Subscription } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-vocab',
  templateUrl: './edit-vocab.component.html',
  styleUrls: ['./edit-vocab.component.scss']
})
export class EditVocabComponent implements OnInit {
  public questions;
  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  public isTeacher;
  public loading = true;
  public questionsByLevel = [];

  constructor(
    private activityService: ActivityService,
    private modalService: BsModalService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setIsTeacher();
  }

  openModal(level) {
    const initialState = {
      level: level
    };

    this.bsModalRef = this.modalService.show(AddQuestionModalComponent, {initialState});
  }

  initTeacher() {
    //Bring in questions
    this.getQuestions();

    this.subscriptions.push(this.modalService.onHide.subscribe((reason: string) => {
      this.getQuestions();
    }));
  }

  initStudent() {

  }

  getQuestions() {
    this.activityService.getQuestions().subscribe(questions => {
        this.questions = questions;
        this.questionsByLevel = this.activityService.parseLevels(this.questions);
      },
      err => {
        console.log(err);
        return false;
      });
  }

  setIsTeacher() {
    this.authService.getProfile().subscribe((response: any) => {
        this.isTeacher = response.user.role === 'teacher';

        if(this.isTeacher) {
          this.initTeacher();
        } else {
          this.initStudent();
        }

        this.loading = false;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  deleteQuestion(level, index) {
    let id = this.questionsByLevel[level][index]._id;
    this.activityService.deleteQuestion(id).subscribe(questions => {
        this.questions = questions;
        this.questionsByLevel = this.activityService.parseLevels(this.questions);
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
