import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable()
export class HomeAuthResolverService implements Resolve<boolean> {

  constructor(private router: Router,
              private userService: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      return this.userService.isAuthenticated.take(1);
  }
}
