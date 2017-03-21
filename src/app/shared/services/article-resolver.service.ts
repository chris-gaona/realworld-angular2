import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Article} from "../models/article.model";
import {ArticleService} from "./article.service";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable()
export class ArticleResolverService implements Resolve<Article> {

  constructor(private articleService: ArticleService,
              private router: Router,
              private userService: UserService) { }

  // resolve the following before the route is shown to user
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.articleService.get(route.params['slug'])
        .catch(err => this.router.navigateByUrl('/'));
  }
}
