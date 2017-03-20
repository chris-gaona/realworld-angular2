import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Profile} from "../../models/profile.model";

@Component({
  selector: 'follow-button',
  templateUrl: 'follow-button.component.html',
  styleUrls: ['follow-button.component.css']
})
export class FollowButtonComponent {

  constructor(private profileService: ProfileService,
              private router: Router,
              private userService: UserService) { }

  @Input() profile: Profile;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting: boolean = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(authenticated => {
      // not authenticated? push to login screen
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      // follow this profile if we aren't already
      if (!this.profile.following) {
        this.profileService.follow(this.profile.username)
          .subscribe(data => {
            this.isSubmitting = false;
            this.onToggle.emit(true);
          }, err => this.isSubmitting = true);

        // otherwise, unfollow this profile
      } else {
        this.profileService.unfollow(this.profile.username)
          .subscribe(data => {
            this.isSubmitting = false;
            this.onToggle.emit(false);
          }, err => this.isSubmitting = false);
      }
    });
  }
}
