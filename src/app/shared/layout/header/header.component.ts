import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'layout-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser
      .subscribe(userData => {
        this.currentUser = userData;
      });
  }
}
