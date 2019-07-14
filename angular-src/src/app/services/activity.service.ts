import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import { AuthService } from './auth.service';

@Injectable()
export class ActivityService {
  authToken: any;
  questions: any;
  profile: any;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  getQuestions() {
    let headers = new Headers();
    this.authToken = this.authService.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    let url = 'question/getQuestions?classId=' + classId;
    return this.http.get(url, {headers: headers})
      .map(res => {
        let questionsData = res.json();
        return questionsData.data;
      });
  }

  addQuestion(question) {
    let headers = new Headers();
    this.authToken = this.authService.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('question/addQuestion', question, {headers: headers})
      .map(res => res.json());
  }

  // Returns updated questions
  deleteQuestion(id) {
    let headers = new Headers();
    this.authToken = this.authService.loadToken();
    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('question/deleteQuestion', {id: id, classId: classId}, {headers: headers})
      .map(res => {
        let questionsData = res.json();
        return questionsData.data;
      });
  }
}
