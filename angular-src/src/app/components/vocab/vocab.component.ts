import { Component, OnInit } from '@angular/core';

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
  private count = 0;
  private lastQuestion;
  private questionTime;
  private timer;
  public score = 0;

  constructor() { }

  ngOnInit() {
    this.questionTime = 10;

    //Bring in questions
    this.questions = [
      {
        question : "What does taberu mean?",
        choiceA : "to eat",
        choiceB : "to sleep",
        choiceC : "to drink",
        correct : "A"
      },{
        question : "What 'shukudai wo shiteiru' mean?",
        choiceA : "did homework",
        choiceB : "doing homework",
        choiceC : "will do homework",
        correct : "B"
      },{
        question : "What does 'omae wa mou shindeiru' mean?",
        choiceA : "You're going to die.",
        choiceB : "You're dying.",
        choiceC : "You're already dead.",
        correct : "C"
      }
    ];

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
      this.count = 0;
      // change progress color to red
      //this.markAsWrong();
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

  markAsWrong() {
    console.log("wrong");
  }

  scoreRender(){
    console.log("wrong");
  }

  checkAnswer(answer) {
    // Right answer
    if(answer === this.questions[this.currentQuestion].correct){
      this.progress.push(true);
      this.score++;
    } else { // Wrong answer
      this.progress.push(false);
    }
    if(this.currentQuestion < this.lastQuestion) {
      this.count = 0;
      this.currentQuestion++;
      this.renderQuestion();
    } else {
      this.view = 'score';
    }

  }

}
