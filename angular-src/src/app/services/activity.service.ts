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
    let url = 'http://localhost:3000/question/getQuestions?classId=' + classId;
    return this.http.get(url, {headers: headers})
      .map(res => {
        let questionsData = res.json();
        return questionsData.data;
      });
  }
}
