import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import { SharedModule,
  FooterComponent,
  HeaderComponent,
  ApiService,
  JwtService,
  AuthGuardService,
  UserService } from './shared';
import { RouterModule } from "@angular/router";
import {SettingsModule} from "./settings/settings.module";

// root of the app
// declares root routing for the application
// empty array because there are no routes currently
// use hash adds the hashbang routing i.e. /#/
// choosing to store routes in each module so routing can be taken care of on a
// feature by feature basis...using child routes on other feature modules
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    HomeModule,
    SettingsModule,
    rootRouting
  ],
  providers: [
    ApiService,
    UserService,
    JwtService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
