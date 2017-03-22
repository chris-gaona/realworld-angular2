import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared";
import {HomeAuthResolverService} from "./resolver/home-auth-resolver.service";

// child module & child routes
// home component is base from where to navigate from
// only one route currently for home page
const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    // solves race condition to check if user is logged in before automatically showing global feed
    resolve: {
      isAuthenticated: HomeAuthResolverService
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeAuthResolverService
  ]
})

export class HomeModule {}
