import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared.module";
import { CompetitionsComponent } from "./competitions.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { CompetitionsRoutingModule } from "./competitions-routing.module";

@NgModule({
    declarations: [         
        CompetitionsComponent, 
        InscriptionComponent,   
    ],
    imports: [
        CompetitionsRoutingModule,
        SharedModule
    ],
    exports:[          
        CompetitionsComponent, 
        InscriptionComponent,
    ]
})
export class ComeptitionsModule { }