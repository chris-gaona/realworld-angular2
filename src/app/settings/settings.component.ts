import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../shared";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });

    // optionally could subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // make a fresh copy of the current user's object to place in editable form fields
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    // fill in the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
      .update(this.user)
      .subscribe(updatedUser => {
        this.router.navigateByUrl('/profile' + updatedUser.username),
          err => {
            this.errors = err;
            this.isSubmitting = false;
          }
      });
  }

  updateUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }
}
