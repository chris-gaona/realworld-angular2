import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {UserService, ArticleService} from "../../services";
import {Article} from "../../models";

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

    // check if user trying to favorite is authenticated
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
