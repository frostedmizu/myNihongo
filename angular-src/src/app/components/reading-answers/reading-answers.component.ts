import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-reading-answers',
  templateUrl: './reading-answers.component.html',
  styleUrls: ['./reading-answers.component.scss']
})
export class ReadingAnswersComponent implements OnInit {
  public answers: any;
  public passages: any;
  public students = [];
  public studentAnswer = {};
  public answersParsed = false;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.getAnswers();
  }

  getAnswers() {
    this.activityService.getReadingAnswers().subscribe( response => {
        this.answers = response;

        this.activityService.getPassages().subscribe( response => {
            this.passages = response;

            this.parseAnswers();
          }

        )
      }

    )
  }

  parseAnswers() {
    for (let i=0; i<this.answers.length; i++) {
      if(!this.students.includes(this.answers[i]['username'])) {
        this.students.push(this.answers[i]['username']);
      }
    }
  }

  renderAnswers(student) {
    this.answersParsed = false;
    this.studentAnswer = {};
    for(let i=0; i<this.answers.length; i++) {
      if(this.answers[i]['username'] === student){
        let readingId = this.answers[i]['_readingId'];
        if(!this.studentAnswer[readingId]) {
          this.studentAnswer[readingId] = {};
          this.studentAnswer[readingId].answer = this.answers[i]['answer'];
        }
      }
    }

    for(let i=0; i<this.passages.length; i++) {
      for(let answer in this.studentAnswer) {
        if(this.passages[i]._id === answer) {
          this.passages[i].answer = this.studentAnswer[answer].answer;
        }
      }
    }
    this.answersParsed = true;
  }
}
