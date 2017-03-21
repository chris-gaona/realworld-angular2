import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Article} from "../../models/article.model";

@Component({
  selector: 'favorite-button',
  templateUrl: 'favorite-button.component.html',
  styleUrls: ['favorite-button.component.css']
})
export class FavoriteButtonComponent {

  constructor(private articleService: ArticleService,
              private router: Router,
              private userService: UserService) { }

  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting: boolean = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .subscribe(authenticated => {
        // not authenticated? push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          this.articleService.favorite(this.article.slug)
            .subscribe(data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            }, err => {
              this.isSubmitting = false;
            });

          // otherwise, unfavorite the article
        } else {
          this.articleService.unfavorite(this.article.slug)
            .subscribe(data => {
              this.isSubmitting = false;
              this.onToggle.emit(false);
            }, err => {
              this.isSubmitting = false;
            });
        }
      })
  }
}
