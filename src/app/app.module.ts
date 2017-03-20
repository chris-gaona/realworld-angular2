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

// root of the app
// declares root routing for the application
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

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
