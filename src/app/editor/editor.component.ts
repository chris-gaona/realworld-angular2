import { Component, OnInit } from '@angular/core';
import {Article} from "../shared/models/article.model";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {ArticleService} from "../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  article: Article = new Article();
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    // us the formBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });

    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // if there's an article prefetched, load it
    this.route.data.subscribe((data: {article: Article}) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    })
  }

  addTag() {
    // retrieve tag control
    let tag = this.tagField.value;
    // only add tag if it does not exit yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }

    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  updateArticle(values: Object) {
    (<any>Object).assign(this.article, values);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateArticle(this.articleForm.value);

    // post the changes
    this.articleService
      .save(this.article)
      .subscribe(article => this.router.navigateByUrl('/article/' + article.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      });
  }
}
