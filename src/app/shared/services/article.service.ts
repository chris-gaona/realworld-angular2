import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Article, ArticleListConfig} from "../models";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class ArticleService {

  constructor(private apiService: ApiService) { }

  // query our database for articles
  query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
    // convert any filters over to Angular's URLSearchParams
    let params: URLSearchParams = new URLSearchParams();

    Object.keys(config.filters).forEach((key) => {
      params.set(key, config.filters[key]);
    });

    return this.apiService
      .get('/articles' + ((config.type === 'feed') ? '/feed' : ''), params)
      .map(data => data);
  }

  // get a specific article
  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug)
      .map(data => data.article);
  }

  // save an article
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

  // delete a article
  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }

  // favorite an article
  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  // unfavorite an article
  unfavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }
}
