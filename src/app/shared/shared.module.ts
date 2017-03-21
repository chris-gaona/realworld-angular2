import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from "./list-errors/list-errors.component";
import { ShowAuthedDirective } from "./show-authed.directive";
import {FollowButtonComponent, FavoriteButtonComponent} from "./buttons";
import {ArticleMetaComponent} from "./article-helpers/article-meta/article-meta.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    ArticleMetaComponent,
    FavoriteButtonComponent,
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
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleMetaComponent
  ]
})
export class SharedModule {}
