import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgImageSliderModule } from 'ng-image-slider';
import { PdfViewerModule } from 'ng2-pdf-viewer'; 
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponent } from './components/new/new.component';
import { DocumentComponent } from './components/document/document.component';
import { QuisommesnousComponent } from './components/quisommesnous/quisommesnous.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigService, configFactory } from './services/config.service';
import { JigorokanoComponent } from './components/jigorokano/jigorokano.component';
import { AdminComponent } from './components/admin/admin.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AdminPhotosComponent } from './components/admin/admin-photos/admin-photos.component';
import { AdminDocumentsComponent } from './components/admin/admin-documents/admin-documents.component';
import { AdminNewsComponent } from './components/admin/admin-news/admin-news.component';
import { AdminNewsDialogComponent } from './components/admin/admin-news/admin-news-dialog/admin-news-dialog.component';
import { NewCardComponent } from './components/new/new-card/new-card.component';
import { NewCardDialogComponent } from './components/new/new-card-dialog/new-card-dialog.component';
import { AdminAgendaComponent } from './components/admin/admin-agenda/admin-agenda.component';
import { AgendaCardComponent } from './components/agenda/agenda-card/agenda-card.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AdminAgendaDialogComponent } from './components/admin/admin-agenda/admin-agenda-dialog/admin-agenda-dialog.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { AdminCompetitionsComponent } from './components/admin/admin-competitions/admin-competitions.component';
import { AdminCompetitionsDialogComponent } from './components/admin/admin-competitions/admin-competitions-dialog/admin-competitions-dialog.component';
import { AdminCompetitionsResultDialogComponent } from './components/admin/admin-competitions/admin-competitions-result-dialog/admin-competitions-result-dialog.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { CreateAccountComponent } from './components/login/create-account/create-account.component';
import { PersonComponent } from './components/quisommesnous/person/person.component';
import { AdminEjtComponent } from './components/admin/admin-ejt/admin-ejt.component';
import { AdminEjtDialogComponent } from './components/admin/admin-ejt/admin-ejt-dialog/admin-ejt-dialog.component';
import { AccountComponent } from './components/login/account/account.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { ConfirmDeleteAccountDialogComponent } from './components/login/confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { InscriptionComponent } from './components/competitions/inscription/inscription.component';
import { AdminAdherentComponent } from './components/admin/admin-adherent/admin-adherent.component';
import { AdminAdherentDialogComponent } from './components/admin/admin-adherent/admin-adherent-dialog/admin-adherent-dialog.component';
import { AdminAdherentLinkDialogComponent } from './components/admin/admin-adherent/admin-adherent-link-dialog/admin-adherent-link-dialog.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    DocumentComponent,
    QuisommesnousComponent,
    HomeComponent,
    LoginComponent,
    JigorokanoComponent,
    AdminComponent,
    AdminPhotosComponent,
    AdminDocumentsComponent,
    AdminNewsComponent,
    AdminNewsDialogComponent,
    NewCardComponent,
    NewCardDialogComponent,
    AdminAgendaComponent,
    AgendaCardComponent,
    AgendaComponent,
    AdminAgendaDialogComponent,
    CompetitionsComponent,
    AdminCompetitionsComponent,
    AdminCompetitionsDialogComponent,
    AdminCompetitionsResultDialogComponent,
    AdminUsersComponent,
    CreateAccountComponent,
    PersonComponent,
    AdminEjtComponent,
    AdminEjtDialogComponent,
    AccountComponent,
    ResetPasswordComponent,
    ConfirmDeleteAccountDialogComponent,
    InscriptionComponent,
    AdminAdherentComponent,
    AdminAdherentDialogComponent,
    AdminAdherentLinkDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgImageSliderModule,
    PdfViewerModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule
  ],
  exports:[
    AdminPhotosComponent,
    AdminDocumentsComponent,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: configFactory, multi: true, deps: [ConfigService]},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
