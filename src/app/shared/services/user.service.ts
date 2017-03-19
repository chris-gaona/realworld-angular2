import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ApiService} from "./api.service";
import {Http} from "@angular/http";
import {User} from "../models/user.model";

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  // converts above to public observable for use throughout the app
  // converting the Subject to an Observable prevents any changes from being made to the User
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // converts above to public observable for use throughout the app
  // converting the Subject to an Observable prevents any changes from being made to the User
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
              private http: Http) {

  }

  setAuth(user: User) {
    // set current user data into observable
    this.currentUserSubject.next(user);
    // set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
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
