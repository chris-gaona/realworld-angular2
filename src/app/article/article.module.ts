import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./article/article.component";
import {SharedModule} from "../shared";
import {MarkdownPipe} from "./pipes/markdown.pipe";
import {ArticleCommentComponent} from "./article-comment/article-comment.component";
import {ArticleResolverService} from "./resolver/article-resolver.service";

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
