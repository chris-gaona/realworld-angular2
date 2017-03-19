import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Errors, UserService} from '../shared';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // init/declare variables strongly typed
  authType: string = '';
  title: string = '';
  errors: Errors = new Errors();
  isSubmitting: boolean = false;
  authForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private fb: FormBuilder) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // subscribing to the current url
    this.route.url.subscribe(data => {
      // get the last piece of the URL (it's either 'login or 'register')
      this.authType = data[data.length - 1].path;
      // set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    })
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    let credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      )
  }

}
