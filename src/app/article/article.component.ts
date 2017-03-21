import { Component, OnInit } from '@angular/core';
import {Article, User, UserService, ArticleService} from "../shared";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    // retrieve the prefetched article
    this.route.data.subscribe((data: {article: Article}) => {
      this.article = data.article;
    });

    // load the current user's data
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;

      this.canModify = (this.currentUser.username === this.article.author.username);
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articleService.destroy(this.article.slug)
      .subscribe(success => this.router.navigateByUrl('/'));
  }
}
