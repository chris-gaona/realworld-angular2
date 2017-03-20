import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../shared";
import {Observable} from "rxjs";

@Injectable()
export class NoAuthGuardService implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      // i.e. if isAuthenticated is false, then set canActivate to true
    return this.userService.isAuthenticated.take(1).map(bool => !bool);
  }
}
