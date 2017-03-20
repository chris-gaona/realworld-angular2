import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      return this.userService.isAuthenticated.take(1);
  }
}
