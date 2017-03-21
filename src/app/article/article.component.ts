import { Component, OnInit } from '@angular/core';
import {
  Article,
  User,
  UserService,
  ArticleService,
  Comment
} from "../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {CommentsService} from "../shared/services/comments.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting: boolean;
  isDeleting: boolean;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private commentsService: CommentsService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    // retrieve the prefetched article
    this.route.data.subscribe((data: {article: Article}) => {
      this.article = data.article;

      // loda the comments on this article
      this.populateComments();
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

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    let commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe(comment => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
      }, err => {
        this.isSubmitting = false;
        this.commentFormErrors = err;
      });
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe(success => {
        this.comments = this.comments.filter((item) => item !== comment);
      })
  }
}
