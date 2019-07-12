import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.scss']
})
export class VocabComponent implements OnInit {
  public view = 'start';
  private questions;
  private currentQuestion = 0;
  public question;
  private progress = [];
  private count = -1;
  private lastQuestion;
  private questionTime;
  private timer;
  public score = 0;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.questionTime = 10;

    //Bring in questions
    this.activityService.getQuestions().subscribe(questions => {
        this.questions = questions;
        this.lastQuestion = this.questions.length - 1;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  startQuiz() {
    this.view = 'quiz';

    this.renderQuestion();
    this.renderCounter();
    this.timer = setInterval(this.renderCounter.bind(this), 1000);
  }

  renderQuestion() {
    this.question = this.questions[this.currentQuestion];
  }

  renderCounter() {
    if(this.count <= this.questionTime){
      this.count++
    } else {
      this.count = -1;
      // change progress color to red
      this.progress.push(false);
      if(this.currentQuestion < this.lastQuestion){
        this.currentQuestion++;
        this.renderQuestion();
      } else{
        // end the quiz and show the score
        clearInterval(this.timer);
        //this.scoreRender();
        this.view = 'score';
      }
    }
  }

  getProgressClass(index) {
    if(typeof this.progress[index] === 'undefined') {
      return "fa fa-circle-thin";
    } else {
      if(this.progress[index]) {
        return "fa fa-circle green";
      } else {
        return "fa fa-circle red";
      }

    }
  }

  checkAnswer(answer) {
    // Right answer
    if(answer === this.questions[this.currentQuestion].answer){
      this.progress.push(true);
      this.score++;
    } else { // Wrong answer
      this.progress.push(false);
    }
    if(this.currentQuestion < this.lastQuestion) {
      this.count = -1;
      this.currentQuestion++;
      this.renderQuestion();
    } else {
      this.view = 'score';
    }

  }

}
