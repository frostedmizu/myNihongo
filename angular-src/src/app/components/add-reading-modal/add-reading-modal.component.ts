import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-add-reading-modal',
  templateUrl: './add-reading-modal.component.html',
  styleUrls: ['./add-reading-modal.component.scss']
})
export class AddReadingModalComponent implements OnInit {
  passage: String;
  showSuccess: boolean;
  showError: boolean;

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

    const passage = {
      passage: this.passage,
      classId: classId
    };

    this.activityService.addPassage(passage).subscribe(
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
    this.passage = undefined;
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
