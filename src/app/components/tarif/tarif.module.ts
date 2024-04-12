
import { NgModule } from "@angular/core";
import { TarifComponent } from "./tarif.component";
import { TarifRoutingModule } from "./tarif-routing.module";
import { SharedModule } from "src/app/shared.module";


@NgModule({
    declarations: [
        TarifComponent
    ],
    imports: [
        TarifRoutingModule,
        SharedModule,
    ],
    exports: [
        TarifComponent
    ]
})
export class TarifModule {
}