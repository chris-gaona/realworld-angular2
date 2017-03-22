import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Profile, ProfileService} from "../../shared";
import {Observable} from "rxjs";

@Injectable()
export class ProfileResolverService implements Resolve<Profile> {

  constructor(private profileService: ProfileService,
              private router: Router) { }

  // resolves the api request before the app route is shown
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.profileService.get(route.params['username'])
        // if there's an error return the user to the home page
        .catch(err => this.router.navigateByUrl('/'));
  }
}
