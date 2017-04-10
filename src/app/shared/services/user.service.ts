import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {ApiService} from "./api.service";
import {User} from "../models";
import {JwtService} from "./jwt.service";

// the whole point of using RxJS is to asynchronously update & share data across your application. This is done by subscribing to the Observable instead of calling getValue synchronously

@Injectable()
export class UserService {

  // BehaviorSubject represents a value that changes over time. Observers can subscribe to the subject to receive the last (or initial) value and all subsequent notifications.
  // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/subjects/behaviorsubject.md
  private currentUserSubject = new BehaviorSubject<User>(new User());
  // converts above to public observable for use throughout the app
  // converting the Subject to an Observable prevents any changes from being made to the User
  // The Observable object represents a push based collection
  // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md
  // distinctUntilChanged method makes sure observable ignores users that are same as previous
  // to create an Observable from a Subject, invoke .asObservable on any Subject
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  // ReplaySubject that can store one value and this value has not been set yet. This value will be set when our UserService authenticates the user
  // using ReplaySubject so we don't have to set it to an initial value
  // switch isAuthenticatedSubject to be a ReplaySubject instead of a BehaviorSubject. The reason for this is that we are able to create isAuthenticatedSubject without an initial value since we don't know if the JWT is valid until the server authenticates it. isAuthenticatedSubject is an Oberservable, which means anything using it will wait until it emits either true or false
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  // converts above to public observable for use throughout the app
  // converting the Subject to an Observable prevents any changes from being made to the User
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
              private jwtService: JwtService) {

  }

  // verify jwt in localStorage with server & load user's info
  // this runs once on application startup...check out app.component.ts ngOnInit()
  populate() {
    // if jwt detected, attempt to get & store user's info

    if (this.jwtService.getToken()) {
      //utilize get() method (params are optional)
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
    // to change the value of an existing BehaviorSubject, call the next method with a new value
    this.currentUserSubject.next(user);
    // set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // remove jwt from localStorage
    this.jwtService.destroyToken();
    // set current user to an empty object
    // to change the value of an existing BehaviorSubject, call the next method with a new value
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

  update(user): Observable<User> {
    return this.apiService.put('/user', {user})
      .map(data => {
        // update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }
}
