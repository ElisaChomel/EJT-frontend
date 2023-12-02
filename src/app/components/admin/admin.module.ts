import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ConfigService, configFactory } from "src/app/services/config.service";
import { MatIconModule } from "@angular/material/icon";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "src/app/shared.module";
import { AdminDocumentsComponent } from "./admin-documents/admin-documents.component";
import { AdminPhotosComponent } from "./admin-photos/admin-photos.component";
import { AdminAdherentLinkDialogComponent } from "./admin-adherent/admin-adherent-link-dialog/admin-adherent-link-dialog.component";
import { AdminAdherentDialogComponent } from "./admin-adherent/admin-adherent-dialog/admin-adherent-dialog.component";
import { AdminAdherentComponent } from "./admin-adherent/admin-adherent.component";
import { AdminEjtDialogComponent } from "./admin-ejt/admin-ejt-dialog/admin-ejt-dialog.component";
import { AdminEjtComponent } from "./admin-ejt/admin-ejt.component";
import { AdminNewsComponent } from "./admin-news/admin-news.component";
import { AdminNewsDialogComponent } from "./admin-news/admin-news-dialog/admin-news-dialog.component";
import { AdminAgendaComponent } from "./admin-agenda/admin-agenda.component";
import { AdminAgendaDialogComponent } from "./admin-agenda/admin-agenda-dialog/admin-agenda-dialog.component";
import { AdminCompetitionsComponent } from "./admin-competitions/admin-competitions.component";
import { AdminCompetitionsDialogComponent } from "./admin-competitions/admin-competitions-dialog/admin-competitions-dialog.component";
import { AdminCompetitionsResultDialogComponent } from "./admin-competitions/admin-competitions-result-dialog/admin-competitions-result-dialog.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
        AdminComponent,
        AdminPhotosComponent,
        AdminDocumentsComponent,
        AdminNewsComponent,
        AdminNewsDialogComponent,
        AdminAgendaComponent,
        AdminAgendaDialogComponent,
        AdminCompetitionsComponent,
        AdminCompetitionsDialogComponent,
        AdminCompetitionsResultDialogComponent,
        AdminUsersComponent,
        AdminEjtComponent,
        AdminEjtDialogComponent,
        AdminAdherentComponent,
        AdminAdherentDialogComponent,
        AdminAdherentLinkDialogComponent
    ],
    imports: [
        AdminRoutingModule,
        SharedModule
    ],
    providers: [
      { provide: APP_INITIALIZER, useFactory: configFactory, multi: true, deps: [ConfigService]}
    ],
    exports:[
        AdminComponent,
        AdminPhotosComponent,
        AdminDocumentsComponent,
    ]
})
export class AdminModule { }