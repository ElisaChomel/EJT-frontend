import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import { HakumichigamiRoutingModule } from "./hakumichigami-routing.module";
import { HakumichigamiComponent } from "./hakumichigami.component";


@NgModule({
    declarations: [
        HakumichigamiComponent
    ],
    imports: [
        HakumichigamiRoutingModule,
        HttpClientModule    
    ],
    exports:[
        HakumichigamiComponent
    ]
})
export class HakumichigamiModule { }