import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {
  translation = '';
  translationInput: string;
  passages: any[];

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.getPassages();
  }

  translate() {
    this.activityService.translate(this.translationInput).subscribe(translation => {
        this.translation = translation;
        this.activityService.postTranslates({translateInput: this.translationInput, translation: translation});

        this.translationInput = '';
  },
      err => {
        console.log(err);
        return false;
      });
  }

  getPassages() {
    this.activityService.getPassages().subscribe( response => {
        this.passages = response;
      }

    )
  }

  submit(passage) {
    let answer = {
      answer: passage.answer,
      readingId: passage._id
    }

    this.activityService.postReadingAnswer(answer).subscribe( response => {
      this.showSubmitSuccess(passage);
    });
  }

  showSubmitSuccess(passage) {
    for(let i=0; i < this.passages.length; i++) {
      if(this.passages[i]._id === passage._id) {
        this.passages[i].submitted = true;
        break;
      }
    }
  }
}
