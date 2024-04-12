import { NgModule } from "@angular/core";
import { HakumichigamiRoutingModule } from "./hakumichigami-routing.module";
import { HakumichigamiComponent } from "./hakumichigami.component";

@NgModule({
    declarations: [
        HakumichigamiComponent
    ],
    imports: [
        HakumichigamiRoutingModule,
    ],
    exports:[
        HakumichigamiComponent
    ]
})
export class HakumichigamiModule { }