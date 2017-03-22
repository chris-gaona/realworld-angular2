import {
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  Input
} from '@angular/core';
import {UserService} from "../services";

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

  // uses an input property setter to intercept and act upon a value from the parent
  @Input() set showAuthed(condition: boolean) {
    // whatever is passed into showAuthed directive is assigned to condition variable
    this.condition = condition;
  }

  ngOnInit() {
    // subscribe to boolean of whether current user is authenticated
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        // if user is authenticated & condition passed into directive is true...
        // OR user is not authenticated & conditions passed into directive is false
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          // templateRef & viewContainer are used to show and hide content
          // hold on to viewContainer & createEmbeddedView to create child view using
          // template reference of what is inside the directive
          // add content within directive to the view
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          // else remove the content within directive from the view
          this.viewContainer.clear();
        }
      }
    )
  }
}
