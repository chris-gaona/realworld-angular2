import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Comment, User} from "../../shared";

@Component({
  selector: 'article-comment',
  templateUrl: 'article-comment.component.html',
  styleUrls: ['article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit() {
    // load the current user's data
    this.userService.currentUser
      .subscribe((userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
      })
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
