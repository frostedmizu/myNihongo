import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { isDevMode } from '@angular/core';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  helper = new JwtHelperService();

  private _logInRefresh: BehaviorSubject<String> = new BehaviorSubject(String());

  public readonly logInRefresh: Observable<String> = this._logInRefresh.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.getBaseUrl() + 'users/register', user, httpOptions)
      .pipe(
        catchError((err) => {return of(err)})
      );

    /*return this.http.post('users/register', user, {headers: headers})
      .map(res => res.json());*/
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.getBaseUrl() + 'users/authenticate', user, httpOptions)
      .pipe(
        catchError((err) => {return of(err)})
      );

    /*return this.http.post('users/authenticate', user, {headers: headers})
      .map(res => res.json());*/
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('profile', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    this.authToken = this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };

    return this.http.get(this.getBaseUrl() + 'users/profile', httpOptions)
      .pipe(
        catchError((err) => {return of(err)})
      );

    /*return this.http.get('users/profile', {headers: headers})
      .map(res => res.json());*/
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return 'JWT ' + token;
  }

  isLoggedIn() {
    const token = localStorage.getItem('id_token');
    if(token) {
      const isLoggedIn = !this.helper.isTokenExpired(token);
      return isLoggedIn;
    } else {
      return false;
    }

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

  refreshNav() {
    this._logInRefresh.next('loggedIn');
  }
}
