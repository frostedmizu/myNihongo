import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.scss']
})
export class VocabComponent implements OnInit {
  public view = 'start';
  public questions;
  private currentQuestion = 0;
  public question;
  private progress = [];
  public count = -1;
  private lastQuestion;
  public questionTime;
  private timer;
  public score = 0;
  public currentLevel = 1;
  private questionsByLevel = [];
  public totalScore = [];

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.questionTime = 10;

    //Bring in questions
    this.activityService.getQuestions().subscribe(questions => {
        this.getQuestions();
  },
      err => {
        console.log(err);
        return false;
      });
  }

  getQuestions() {
    this.activityService.getQuestions().subscribe(questions => {
        this.questionsByLevel = this.activityService.parseLevels(questions);
        this.setLevel();
      },
      err => {
        console.log(err);
        return false;
      });
  }

  setLevel() {
    this.questions = this.questionsByLevel[this.currentLevel - 1];
    this.lastQuestion = this.questions.length - 1;
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
        this.addScore();
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
    let correct;
    // Right answer
    if(answer === this.questions[this.currentQuestion].answer){
      this.progress.push(true);
      this.score++;
      correct = true;
    } else { // Wrong answer
      this.progress.push(false);
      correct = false;
    }

    // Save answer to DB
    const score = {
      correct: correct,
      level: this.questions[this.currentQuestion].level,
      questionId: this.questions[this.currentQuestion]._id
    };
    this.activityService.postScore(score);

    if(this.currentQuestion < this.lastQuestion) {
      this.count = -1;
      this.currentQuestion++;
      this.renderQuestion();
    } else {
      this.addScore();
    }

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

  startNewLevel() {
    this.currentQuestion = 0;
    this.progress = [];
    this.count = -1;
    this.score = 0;
    this.currentLevel++;
    this.setLevel();
    this.startQuiz();
  }

  hasNextLevel() {
    return this.questionsByLevel.length > this.currentLevel;
  }

  addScore() {
    clearInterval(this.timer);
    this.view = 'score';
    this.totalScore.push({
      score: this.score,
      total: this.questions.length,
      level: this.currentLevel
    });
  }

  end() {
    this.view = 'end';
  }
}
