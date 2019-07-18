import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent implements OnInit {
  question: String;
  choiceA: String;
  choiceB: String;
  choiceC: String;
  choiceD: String;
  answer: String;
  showSuccess: boolean;
  showError: boolean;
  level: number;

  answerOptions = [
    {value: "A", label: "A"},
    {value: "B", label: "B"},
    {value: "C", label: "C"},
    {value: "D", label: "D"}
  ];

  constructor(
    public bsModalRef: BsModalRef,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.clearMsg();
    let profile = JSON.parse(localStorage.getItem('profile'));
    let classId = profile.classId;

    const question = {
      question: this.question,
      choiceA: this.choiceA,
      choiceB: this.choiceB,
      choiceC: this.choiceC,
      choiceD: this.choiceD,
      answer: this.answer,
      level: this.level,
      classId: classId
    };

    this.activityService.addQuestion(question).subscribe(
      (data => {
        if(data.success) {
          this.resetForm();
          this.showSuccessMsg();
        } else {
          this.showErrorMsg();
        }
      }),
      err => {
        this.showErrorMsg();
      });
  }

  resetForm() {
    this.question = undefined;
    this.choiceA = undefined;
    this.choiceB = undefined;
    this.choiceC = undefined;
    this.choiceD = undefined;
    this.answer = undefined;
  }

  showSuccessMsg() {
    this.showSuccess = true;
  }
  showErrorMsg() {
    this.showError = true;
  }


  clearMsg() {
    this.showError = false;
    this.showSuccess = false;
  }
}
