
import { NgModule } from "@angular/core";
import { HoraireComponent } from "./horaire.component";
import { HoraireRoutingModule } from "./horaire-routing.module";
import { SharedModule } from "src/app/shared.module";


@NgModule({
    declarations: [
        HoraireComponent
    ],
    imports: [
        HoraireRoutingModule,
        SharedModule,
    ],
    exports: [
        HoraireComponent
    ]
})
export class HoraireModule {
}