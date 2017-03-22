import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Article, ArticleService} from "../../shared";
import {Observable} from "rxjs";

@Injectable()
export class ArticleResolverService implements Resolve<Article> {

  constructor(private articleService: ArticleService,
              private router: Router) { }

  // resolve the following before the route is shown to user
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.articleService.get(route.params['slug'])
        .catch(err => this.router.navigateByUrl('/'));
  }
}
