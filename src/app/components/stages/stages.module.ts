import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared.module";
import { StagesComponent } from "./stages.component";
import { StagesRoutingModule } from "./stages-routing.module";

@NgModule({
    declarations: [         
        StagesComponent,   
    ],
    imports: [
        StagesRoutingModule,
        SharedModule
    ],
    exports:[          
        StagesComponent,
    ]
})
export class StagesModule { }