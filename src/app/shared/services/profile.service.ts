import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Profile} from "../models";

@Injectable()
export class ProfileService {

  constructor(private apiService: ApiService) { }

  // get specific profile
  get(username: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + username)
      .map((data: {profile: Profile}) => data.profile);
  }

  // follow a specific user
  follow(username: string): Observable<Profile> {
    return this.apiService.post('/profiles/' + username + '/follow');
  }

  // unfollow a specific user
  unfollow(username: string): Observable<Profile> {
    return this.apiService.delete('/profiles/' + username + '/follow');
  }
}
