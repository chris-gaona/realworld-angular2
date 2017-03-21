import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileResolverService, SharedModule} from "../shared";
import {ProfileArticlesComponent} from "./profile-articles/profile-articles.component";
import {ProfileFavoritesComponent} from "./profile-favorites/profile-favorites.component";

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile/:username',
    component: ProfileComponent,
    // makes sure route is not shown unless the following api call is resolved first
    resolve: {
      profile: ProfileResolverService
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    profileRouting,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
  ],
  providers: [
    ProfileResolverService
  ]
})

export class ProfileModule {}
