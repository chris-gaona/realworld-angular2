import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TagsService, UserService, ArticleListConfig} from "../shared";

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private tagsService: TagsService,
              private userService: UserService) { }

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded: boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      });

    this.tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // if feed is requested by user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
