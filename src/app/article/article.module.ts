import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./article.component";
import {ArticleResolverService, SharedModule} from "../shared";
import {MarkdownPipe} from "./markdown.pipe";
import {ArticleCommentComponent} from "./article-comment/article-comment.component";

const articleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      // resolve data before the view is rendered
      article: ArticleResolverService
    }
  }
]);

@NgModule({
  imports: [
    articleRouting,
    SharedModule
  ],
  declarations: [
    ArticleComponent,
    MarkdownPipe,
    ArticleCommentComponent
  ],
  providers: [
    ArticleResolverService
  ]
})

export class ArticleModule {}
