import { QuisommesnousRoutingModule } from "./quisommesnous-routing.module";
import { QuisommesnousComponent } from "./quisommesnous.component";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "src/app/shared.module";

@NgModule({
    declarations: [
        QuisommesnousComponent
    ],
    imports: [
        QuisommesnousRoutingModule,
        SharedModule
    ],
    exports:[
        QuisommesnousComponent
    ]
})
export class QuisommesnousModule { }