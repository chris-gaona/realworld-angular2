import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Article, ArticleService, UserService} from "../../shared";
import {Observable} from "rxjs";

@Injectable()
export class EditableArticleResolverService implements Resolve<Article> {

  constructor(private articleService: ArticleService,
              private router: Router,
              private userService: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.articleService.get(route.params['slug'])
        .map(article => {
          if (this.userService.getCurrentUser().username === article.author.username) {
            return article;
          } else {
            this.router.navigateByUrl('/');
          }
        }).catch(err => this.router.navigateByUrl('/'));
  }
}
