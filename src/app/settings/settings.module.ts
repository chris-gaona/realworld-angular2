import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SettingsComponent} from "./settings.component";
import {AuthGuardService} from "../shared";
import {SharedModule} from "../shared/shared.module";

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    settingsRouting
  ],
  declarations: [
    SettingsComponent
  ]
})

export class SettingsModule {}
