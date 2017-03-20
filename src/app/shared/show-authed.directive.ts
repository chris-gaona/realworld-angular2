import {Directive, OnInit, TemplateRef, ViewContainerRef, Input} from '@angular/core';
import {UserService} from "./services/user.service";

// directive called ShowAuthedDirective that will show or hide an element based on the current user's authentication status

@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit {

  constructor(private templateRef: TemplateRef<any>,
              private userService: UserService,
              private viewContainer: ViewContainerRef) {

  }

  condition: boolean;

  @Input() set showAuthed(condition: boolean) {
    this.condition = condition;
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }
}
