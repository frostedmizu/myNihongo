import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Subscription} from "rxjs";
import {ActivityService} from "../../services/activity.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {AddReadingModalComponent} from "../add-reading-modal/add-reading-modal.component";

@Component({
  selector: 'app-edit-reading',
  templateUrl: './edit-reading.component.html',
  styleUrls: ['./edit-reading.component.scss']
})
export class EditReadingComponent implements OnInit {
  public passages;
  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  public isTeacher;
  public loading = true;

  constructor(
    private activityService: ActivityService,
    private modalService: BsModalService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setIsTeacher();
  }

  openModal() {
    this.bsModalRef = this.modalService.show(AddReadingModalComponent);
  }

  initTeacher() {
    //Bring in questions
    this.getReadings();

    this.subscriptions.push(this.modalService.onHide.subscribe((reason: string) => {
      this.getReadings();
    }));
  }

  getReadings() {
    this.activityService.getPassages().subscribe(passages => {
        this.passages = passages;
        console.log(passages);
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
        }

        this.loading = false;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  deleteQuestion(index) {
    /*let id = this.questionsByLevel[level][index]._id;
    this.activityService.deleteQuestion(id).subscribe(questions => {
        this.questions = questions;
        this.questionsByLevel = this.activityService.parseLevels(this.questions);
        this.flashMessagesService.show('Question removed',
          {cssClass: 'alert-success', timeout: 3000});
      },
      err => {
        console.log(err);
        return false;
      });*/
  }

  hasPassages() {
    if(!this.passages) {
      return false;
    } else if(!this.passages.length) {
      return false;
    } else {
      return true;
    }
  }
}
