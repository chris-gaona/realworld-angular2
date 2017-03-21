import {Component, Input} from '@angular/core';
import {Article} from "../../models/article.model";

@Component({
  selector: 'article-meta',
  templateUrl: 'article-meta.component.html',
  styleUrls: ['article-meta.component.css']
})
export class ArticleMetaComponent {

  @Input() article: Article;

}
