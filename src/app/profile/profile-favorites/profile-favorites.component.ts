import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profile} from "../../shared/models/profile.model";
import {ArticleListConfig} from "../../shared/models/article-list-config.model";

@Component({
  selector: 'profile-favorites',
  templateUrl: 'profile-favorites.component.html',
  styleUrls: ['profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  profile: Profile;
  favoritesConfig: ArticleListConfig = new ArticleListConfig();

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: {profile: Profile}) => {
        this.profile = data.profile;
        this.favoritesConfig.filters.favorited = this.profile.username;
      });
  }

}
