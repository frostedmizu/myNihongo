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
  key = 'AIzaSyDDyrzFA_rk-Inoo9sFvtoQf7CP09S7P4o';



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

  getPassages() {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    let url = this.getBaseUrl() + 'reading/getReading?classId=' + classId;
    return this.http.get(url, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
  }

  addPassage(passage) {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post(this.getBaseUrl() + 'reading/addReading', passage, httpOptions)
      .pipe(
        catchError((err) => {return of(err)})
      );
  }

  // Returns updated passages
  deletePassage(id) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;

    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post(this.getBaseUrl() + 'reading/deleteReading', {id: id, classId: classId}, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
  }

  translate(input) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post('https://translation.googleapis.com/language/translate/v2?key=' + this.key ,
      {
        source: "ja",
        target: "en",
        q: input
      }, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data.translations[0].translatedText;
        }),
        catchError((err) => {return of(err)})
      );
  }

  getScores() {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    let url = this.getBaseUrl() + 'answer/getScores?classId=' + classId;
    return this.http.get(url, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
  }

  postScore(score) {
    return this.authService.getProfile().subscribe((profile) => {
      score.username = profile.user.username;
      score.classId = profile.user._classId;
      this.authToken = this.authService.loadToken();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.authToken
        })
      };

      return this.http.post(this.getBaseUrl() + 'answer/addScore', score, httpOptions)
        .pipe(
          map((response: any) => {
            console.log(response);
            return response;
          }),
          catchError((err) => {
            return of(err)
          })
        ).subscribe();
    });
  }

  deleteScores() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;

    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post(this.getBaseUrl() + 'answer/deleteScores', {classId: classId}, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
  }

  getReadingAnswers() {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    let url = this.getBaseUrl() + 'answer/getReadingAnswers?classId=' + classId;
    return this.http.get(url, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
  }

  postReadingAnswer(answer) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    answer.username = this.profile.username;
    answer.classId = this.profile.classId;
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.post(this.getBaseUrl() + 'answer/addReadingAnswer', answer, httpOptions)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((err) => {
          return of(err)
        })
      );
  }

  getTranslates() {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    let classId = this.profile.classId;
    let url = this.getBaseUrl() + 'reading/getTranslates?classId=' + classId;
    return this.http.get(url, httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        }),
        catchError((err) => {return of(err)})
      );
  }

  postTranslates(translate) {
    this.authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    translate.username = this.profile.username;
    translate.classId = this.profile.classId;
    this.authToken = this.authService.loadToken();

    return this.http.post(this.getBaseUrl() + 'reading/addTranslate', translate, httpOptions)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((err) => {
          return of(err)
        })
      ).subscribe();
  }
}
