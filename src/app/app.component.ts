import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor (private userService: UserService) {}

  ngOnInit() {
    // verify jwt in localStorage with server & load user's info
    // runs once on app startup
    this.userService.populate();
  }
}
