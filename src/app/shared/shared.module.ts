import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from "./list-errors/list-errors.component";
import { ShowAuthedDirective } from "./show-authed.directive";
import {FollowButtonComponent} from "./buttons";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    FollowButtonComponent,
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent
  ]
})
export class SharedModule {}
