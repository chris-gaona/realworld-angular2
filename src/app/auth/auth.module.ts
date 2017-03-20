import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared";
import {NoAuthGuardService} from "./no-auth-guard.service";

// handle auth child navigation/routes
const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuardService]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuardService
  ]
})

export class AuthModule {}
