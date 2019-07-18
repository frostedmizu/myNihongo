import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Question} from "../models/question";
import { isDevMode } from '@angular/core';

@Injectable()
export class ActivityService {
  authToken: any;
  questions: any;
  profile: any;



constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  getQuestions() {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    let url = this.getBaseUrl() + 'question/getQuestions?classId=' + classId;
    return this.http.get(url, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
      /*.map(res => {
        let questionsData = res.json();
        return questionsData.data;
      });*/
  }

  addQuestion(question) {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post(this.getBaseUrl() + 'question/addQuestion', question, httpOptions)
      .pipe(
        catchError((err) => {return of(err)})
      );

    /*return this.http.post('question/addQuestion', question, {headers: headers})
      .map(res => res.json());*/
  }

  // Returns updated questions
  deleteQuestion(id) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;


    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post(this.getBaseUrl() + 'question/deleteQuestion', {id: id, classId: classId}, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
    /*return this.http.post('question/deleteQuestion', {id: id, classId: classId}, {headers: headers})
      .map(res => {
        let questionsData = res.json();
        return questionsData.data;
      });*/
  }

  parseLevels(questions) {
    let questionsByLevel = [];
    for(let i=0; i < questions.length; i++) {
      let level = questions[i].level;
      if(questionsByLevel.length < level) {
        questionsByLevel[level - 1] = [];
        questionsByLevel[level - 1].push(questions[i]);
      } else {
        questionsByLevel[level - 1].push(questions[i]);
      }
    }
    return questionsByLevel;
  }

  getBaseUrl() {
    let baseUrl: string;
    if (isDevMode()) {
      baseUrl = "http://localhost:8080/";
    } else {
      baseUrl = "";
    }
    return baseUrl;
  }
}
