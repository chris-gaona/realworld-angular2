import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class TagsService {

  constructor(private apiService: ApiService) { }

  getAll(): Observable<[string]> {
    return this.apiService.get('/tags')
      .map(data => data.tags);
  }
}
