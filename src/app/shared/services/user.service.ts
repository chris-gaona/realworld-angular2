import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {ApiService} from "./api.service";
import {Http} from "@angular/http";
import {User} from "../models/user.model";
import {JwtService} from "./jwt.service";

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  // converts above to public observable for use throughout the app
  // converting the Subject to an Observable prevents any changes from being made to the User
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  // converts above to public observable for use throughout the app
  // converting the Subject to an Observable prevents any changes from being made to the User
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
              private http: Http,
              private jwtService: JwtService) {

  }

  // verify jwt in localStorage with server & load user's info
  // this runs once on application startup

  populate() {
    // if jwt detected, attempt to get & store user's info

    if (this.jwtService.getToken()) {
      //utilize our newly created get() method (params are optional)
      this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // save jwt sent from server in localStorage
    this.jwtService.saveToken(user.token);
    // set current user data into observable
    this.currentUserSubject.next(user);
    // set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // remove jwt from localStorage
    this.jwtService.destroyToken();
    // set current user to an empty object
    this.currentUserSubject.next(new User());
    // set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    let route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .map(data => {
        this.setAuth(data.user);
        return data;
      });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
