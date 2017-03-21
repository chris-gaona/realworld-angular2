import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EditorComponent} from "./editor.component";
import {AuthGuardService, EditableArticleResolverService} from "../shared";
import {SharedModule} from "../shared/shared.module";

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      article: EditableArticleResolverService
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolverService
  ]
})

export class EditorModule {}
