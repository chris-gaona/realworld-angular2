import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Article} from "../models/article.model";

@Injectable()
export class ArticleService {

  constructor(private apiService: ApiService) { }

  // get a specific article
  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
      .map(data => data.article);
  }

  save(article): Observable<Article> {
    // if we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, {article: article})
        .map(data => data.article);

      // otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', {article: article})
        .map(data => data.article);
    }
  }

  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }
}
