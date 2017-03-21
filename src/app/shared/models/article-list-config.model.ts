export class ArticleListConfig {
  type: string = 'all';

  // ? after the variable name indicates that the field is optional
  filters: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number
  } = {};
}
