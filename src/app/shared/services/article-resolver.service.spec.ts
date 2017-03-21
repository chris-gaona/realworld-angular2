import { TestBed, inject } from '@angular/core/testing';

import { ArticleResolverService } from './article-resolver.service';

describe('ArticleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleResolverService]
    });
  });

  it('should ...', inject([ArticleResolverService], (service: ArticleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
