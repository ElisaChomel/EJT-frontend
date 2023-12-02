import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { PersonComponent } from "./components/quisommesnous/person/person.component";
import { NewCardComponent } from "./components/new/new-card/new-card.component";
import { AgendaCardComponent } from "./components/agenda/agenda-card/agenda-card.component";
import { NewCardDialogComponent } from "./components/new/new-card-dialog/new-card-dialog.component";

import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfigService, configFactory } from "./services/config.service";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { ReactiveFormsModule } from "@angular/forms";

registerLocaleData(localeFr);

@NgModule({
    declarations: [
        PersonComponent,  
        NewCardComponent,
        NewCardDialogComponent,
        AgendaCardComponent,
    ],
    imports: [
        DragDropModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        PdfViewerModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: configFactory, multi: true, deps: [ConfigService]},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'fr-FR'},
    ],
    exports:[
        PersonComponent,  
        NewCardComponent,
        NewCardDialogComponent,
        AgendaCardComponent,        
        DragDropModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        PdfViewerModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule { }