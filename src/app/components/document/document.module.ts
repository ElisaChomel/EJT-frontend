
import { NgModule } from "@angular/core";
import { DocumentComponent } from "./document.component";
import { DocumentRoutingModule } from "./document-routing.module";
import { SharedModule } from "src/app/shared.module";


@NgModule({
    declarations: [
        DocumentComponent
    ],
    imports: [
        DocumentRoutingModule,
        SharedModule,
    ],
    exports: [
        DocumentComponent
    ]
})
export class DocumentModule {
}