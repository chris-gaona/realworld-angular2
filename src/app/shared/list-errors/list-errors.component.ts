import {Component, Input} from '@angular/core';
import {Errors} from "../models";

@Component({
  selector: 'list-errors',
  templateUrl: 'list-errors.component.html',
  styleUrls: ['list-errors.component.css']
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  // uses an input property setter to intercept and act upon a value from the parent
  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];

    if (errorList.errors) {
      // iterate through the error object
      // each key in key/value pair
      for (let field in errorList.errors) {
        // errors displayed as key and then value
        this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
      }
    }
  }

  get errorList() { return this.formattedErrors; }
}
