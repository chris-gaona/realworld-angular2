import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArticleComponent} from "./article.component";
import {ArticleResolverService, SharedModule} from "../shared";
import {MarkdownPipe} from "./markdown.pipe";

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
    MarkdownPipe
  ],
  providers: [
    ArticleResolverService
  ]
})

export class ArticleModule {}
