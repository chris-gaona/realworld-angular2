import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {ProfileResolverService, SharedModule} from "../shared";

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile/:username',
    component: ProfileComponent,
    // makes sure route is not shown unless the following api call is resolved first
    resolve: {
      profile: ProfileResolverService
    }
  }
]);

@NgModule({
  imports: [
    profileRouting,
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProfileResolverService
  ]
})

export class ProfileModule {}
